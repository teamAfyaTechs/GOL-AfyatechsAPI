const mongoose = require('mongoose');

const medicalHistorySchema = mongoose.Schema({
  facialID: {
    type: String,
    required: true
  },
  dateOfVisit: {
    type: Date,
    required: [true, 'Please add a date of visit'],
  },
  reasonForVisit: {
    type: String,
    required: [true, 'Please add a reason for visit'],
  },
  diagnosis: {
    type: String,
    required: [true, 'Please add a diagnosis'],
  },
  treatmentPlan: {
    type: String,
    required: [true, 'Please add a treatment plan'],
  },
  medicationsPrescribed: {
    type: String,
    required: [true, 'Please add medications prescribed'],
  },
  allergies: {
    type: String,
    required: [true, 'Please add allergies'],
  },
  chronicConditions: {
    type: String,
    required: [true, 'Please add chronic conditions'],
  },
  familyMedicalHistory: {
    type: String,
    required: [true, 'Please add family medical history'],
  },

});


module.exports = mongoose.model('MedicalHistory', medicalHistorySchema);
