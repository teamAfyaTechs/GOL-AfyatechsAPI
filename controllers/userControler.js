const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

// @desc    Register a user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, medical_level, gender } = req.body;

  // Check if any field is empty
  if (!name || !email || !password || !medical_level || !gender) {
    res.status(400).json('All fields are required');
  }

  // Check if email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json('Invalid email address');
  }

  // Check password length
  if (password.length < 8) {
    res.status(400).json('Password must be at least 8 characters long');
  }

  // Check if user with email already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400).json('User with email already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    medical_level,
    gender,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      medical_level: user.medical_level,
      gender: user.gender,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json('Invalid user data');
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if any field is empty
  if (!email || !password) {
    res.status(400).json('Email and password are required');
  } else {

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        accessToken: generateToken(user._id),
      });
    } else {
      res.status(400).json("Invalid Creditials");
    }
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getPatient = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

const logout = asyncHandler(async (req, res) => {
  res.cookie('accessToken', '').send();
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  loginUser,
  getPatient,
  logout,
  registerUser,
};
