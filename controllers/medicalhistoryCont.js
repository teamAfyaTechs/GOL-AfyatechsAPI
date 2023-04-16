const asyncHandler = require('express-async-handler');
const MedicalHistory = require('../models/medicalhistoryModel');
const Patient = require('../models/patientModel');

// @desc    Get medical history for a specific patient
// @route   GET /api/medical-history/:patientId
// @access  Private (Medical Practioner only)
const getMedicalHistory = asyncHandler(async (req, res) => {
  const patient = await Patient.findOne({ facialID: req.params.id })

  if (!patient) {
    res.status(404).json('Patient not found');
  } else {


    const medicalHistory = await MedicalHistory.find({ facialID: req.params.id })

    res.status(200).json(medicalHistory);
  }
});

// @desc    Add a medical history for a patient
// @route   POST /api/medical-history
// @access  Private (Medical Practioner only)
const addMedicalHistory = asyncHandler(async (req, res) => {
  const newMedicalHistory = new MedicalHistory(req.body);

  const patient = await Patient.findOne({ facialID: req.body.facialID })

  if (!patient) {
    res.status(404).json('Patient not found');
  }

  const medicalHistory = await newMedicalHistory.save();

  res.status(201).json(medicalHistory);
});

// @desc    Update a medical history for a patient
// @route   PUT /api/medical-history/:id
// @access  Private 
const updateMedicalHistory = asyncHandler(async (req, res) => {
  const {
    dateOfVisit,
    reasonForVisit,
    diagnosis,
    treatmentPlan,
    medicationsPrescribed,
    allergies,
    chronicConditions,
    familyMedicalHistory,
  } = req.body;

  const medicalHistory = await MedicalHistory.findById(req.params.id);

  if (!medicalHistory) {
    res.status(404).json('Medical history not found');
  }

  const patient = await Patient.findById(medicalHistory.patient);

  if (!patient) {
    res.status(404).json('Patient not found');
  }

  if (patient._id.toString() !== req.user.patient) {
    res.status(401).json('User not authorized');
  }

  medicalHistory.dateOfVisit = dateOfVisit;
  medicalHistory.reasonForVisit = reasonForVisit;
  medicalHistory.diagnosis = diagnosis;
  medicalHistory.treatmentPlan = treatmentPlan;
  medicalHistory.medicationsPrescribed = medicationsPrescribed;
  medicalHistory.allergies = allergies;
  medicalHistory.chronicConditions = chronicConditions;
  medicalHistory.familyMedicalHistory = familyMedicalHistory;

  const updatedMedicalHistory = await medicalHistory.save();

  res.status(200).json({
    patientName: patient.name,
    medicalHistory: updatedMedicalHistory,
  });
});

// Controller function to get the total number of hospital visits
const getTotalHospitalVisits = asyncHandler(async (req, res) => {
  const totalVisits = await MedicalHistory.countDocuments({ type: 'hospital' });
  res.json({ totalVisits });
});

module.exports = {
  getMedicalHistory,
  addMedicalHistory,
  updateMedicalHistory,
  getTotalHospitalVisits
};
