const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please add a first name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please add a last name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number'],
  },
  address: {
    type: String,
    required: [true, 'Please add an address'],
  },
  emergencyContactName: {
    type: String,
    required: [true, 'Please add an emergency contact name'],
  },
  emergencyContactPhone: {
    type: String,
    required: [true, 'Please add an emergency contact phone number'],
  },
  bloodType: {
    type: String,
    required: [true, 'Please add a blood type'],
  },
  insuranceProvider: {
    type: String,
    required: [true, 'Please add an insurance provider'],
  },
  insurancePolicyNumber: {
    type: String,
    required: [true, 'Please add an insurance policy number'],
  },
});

module.exports = mongoose.model('Patient', patientSchema);
