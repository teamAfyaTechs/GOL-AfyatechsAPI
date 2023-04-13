const express = require('express')
const router = express.Router()
const {
  getMedicalHistories,
  addMedicalHistory,
  updateMedicalHistory,
} = require('../controllers/medicalhistoryCont')
const { protect } = require('../middlewares/authmw')

router.route('/add').get(protect, getMedicalHistories).post(protect, addMedicalHistory)
router.route('/:id').put(protect, updateMedicalHistory)

module.exports = router
