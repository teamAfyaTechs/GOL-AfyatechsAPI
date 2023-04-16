const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

// @desc    Register a user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(404).send("Email Exit!")
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).json("User has been created!");
  } catch (err) {

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
        phone: user.phone,
        medical_level: user.medical_level,
        gender: user.gender,
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
