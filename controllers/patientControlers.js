const asyncHandler = require('express-async-handler')
const Patient = require('../models/patientModel')
const User = require('../models/userModel')

// @desc    get all patients
// @route   GET /api/patients
// @access  Private
const getPatients = asyncHandler(async (req, res) => {
  const patients = await Patient.find({})
  res.status(200).json(patients)
})

// @desc    get a single patient
// @route   GET /api/patients/:id
// @access  Private
const getPatientById = asyncHandler(async (req, res) => {
  const patient = await Patient.findOne({ facialID: req.params.id })

  if (!patient) {
    res.status(404).json('Patient not found')
  }

  res.status(200).json(patient)
})

// @desc    add patients
// @route   POST /api/patients
// @access  Private
const addpatient = asyncHandler(async (req, res) => {
  const newPatient = new Patient(req.body);
  try {
    const patient = await newPatient.save()
    res.status(200).json(patient)
  } catch (error) {
    res.status(500).json(error);
  }
})

// @desc    Update patients
// @route   PUT /api/patients/:id
// @access  Private
const updatepatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id)

  if (!patient) {
    res.status(400)
    throw new Error('Patient not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the patient user
  if (patient.user.toString() !== req.user.id) {
    res.status(401).json('User not authorized')
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    emergencyContactName,
    emergencyContactPhone,
    bloodType,
    insuranceProvider,
    insurancePolicyNumber,
  } = req.body

  const updatedpatient = await Patient.findByIdAndUpdate(
    req.params.id,
    {
      firstName,
      lastName,
      email,
      phone,
      address,
      emergencyContactName,
      emergencyContactPhone,
      bloodType,
      insuranceProvider,
      insurancePolicyNumber,
    },
    { new: true }
  )

  res.status(200).json(updatedpatient)
})

module.exports = {
  getPatients,
  getPatientById,
  addpatient,
  updatepatient,
}
