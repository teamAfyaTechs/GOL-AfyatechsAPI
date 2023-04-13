const asyncHandler = require('express-async-handler')

const Patient = require('../models/patientModel')
const User = require('../models/userModel')

// @desc    get patients
// @route   GET /api/patients
// @access  Private
const getpatient = asyncHandler(async (req, res) => {
  const patients = await Patient.find({ user: req.user.id })

  res.status(200).json(patients)
})

// @desc    Set patients
// @route   POST /api/patients
// @access  Private
const addpatient = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const patient = await Patient.create({
    text: req.body.text,
    user: req.user.id,
  })

  res.status(200).json(patient)
})

// @desc    Update patients
// @route   PUT /api/patients/:id
// @access  Private
const updatepatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id)

  if (!patient) {
    res.status(400)
    throw new Error('patient not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (patient.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedpatient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedpatient)
})


module.exports = {
  getpatient,
  addpatient,
  updatepatient,

}
