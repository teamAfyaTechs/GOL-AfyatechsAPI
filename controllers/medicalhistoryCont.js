const asyncHandler = require('express-async-handler')
const MedicalHistory = require('../models/medicalhistoryModel')

// @desc    Get all medical histories for the logged in user
// @route   GET /api/medical-histories
// @access  Private
const getMedicalHistories = asyncHandler(async (req, res) => {
  const medicalHistories = await MedicalHistory.find({ user: req.user.id })

  res.status(200).json(medicalHistories)
})

// @desc    Add a medical history for the logged in user
// @route   POST /api/medical-histories
// @access  Private
const addMedicalHistory = asyncHandler(async (req, res) => {
  const { date, description } = req.body

  const medicalHistory = await MedicalHistory.create({
    date,
    description,
    user: req.user.id,
  })

  res.status(201).json(medicalHistory)
})

// @desc    Update a medical history for the logged in user
// @route   PUT /api/medical-histories/:id
// @access  Private
const updateMedicalHistory = asyncHandler(async (req, res) => {
  const { date, description } = req.body

  const medicalHistory = await MedicalHistory.findById(req.params.id)

  if (!medicalHistory) {
    res.status(404)
    throw new Error('Medical history not found')
  }

  if (medicalHistory.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  medicalHistory.date = date
  medicalHistory.description = description

  const updatedMedicalHistory = await medicalHistory.save()

  res.status(200).json(updatedMedicalHistory)
})

module.exports = {
  getMedicalHistories,
  addMedicalHistory,
  updateMedicalHistory,
}
