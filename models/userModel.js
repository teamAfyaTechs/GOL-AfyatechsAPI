const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    medical_level: {
      type: String,
      required: [true, 'Please add your Medical Level'],
    },
    gender: {
      type: String,
      required: [true, 'Kindly enter your gender'],
    },
    phone: {
      type: Number,
      required: [true, 'Kindly enter your Phone'],
    },

  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)