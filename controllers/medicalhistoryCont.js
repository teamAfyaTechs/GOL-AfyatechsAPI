const asyncHandler = require('express-async-handler');
const MedicalHistory = require('../models/medicalhistoryModel');
const Patient = require('../models/patientModel');

// @desc    Get medical history for a specific patient
// @route   GET /api/medical-history/:patientId
// @access  Private (Medical Practioner only)
const getMedicalHistory = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.patientId);

  if (!patient) {
    res.status(404);
    throw new Error('Patient not found');
  }

  const medicalHistory = await MedicalHistory.find({ patient: req.params.patientId }).populate('patient');

  res.status(200).json({
    patientName: patient.name,
    medicalHistory,
  });
});

// @desc    Add a medical history for a patient
// @route   POST /api/medical-history
// @access  Private (Medical Practioner only)
const addMedicalHistory = asyncHandler(async (req, res) => {
  const {
    patientId,
    dateOfVisit,
    reasonForVisit,
    diagnosis,
    treatmentPlan,
    medicationsPrescribed,
    allergies,
    chronicConditions,
    familyMedicalHistory,
  } = req.body;

  const patient = await Patient.findById(patientId);

  if (!patient) {
    res.status(404);
    throw new Error('Patient not found');
  }

  const medicalHistory = await MedicalHistory.create({
    patient: patientId,
    dateOfVisit,
    reasonForVisit,
    diagnosis,
    treatmentPlan,
    medicationsPrescribed,
    allergies,
    chronicConditions,
    familyMedicalHistory,
  });

  res.status(201).json({
    patientName: patient.name,
    medicalHistory,
  });
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
    res.status(404);
    throw new Error('Medical history not found');
  }

  const patient = await Patient.findById(medicalHistory.patient);

  if (!patient) {
    res.status(404);
    throw new Error('Patient not found');
  }

  if (patient._id.toString() !== req.user.patient) {
    res.status(401);
    throw new Error('User not authorized');
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

module.exports = {
  getMedicalHistory,
  addMedicalHistory,
  updateMedicalHistory,
};
