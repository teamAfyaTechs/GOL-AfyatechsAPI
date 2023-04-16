const express = require('express');
const router = express.Router();
const { addMedicalHistory, updateMedicalHistory, getMedicalHistory, getTotalHospitalVisits } = require('../controllers/medicalhistoryCont');
const { protect } = require('../middlewares/authmw');

// GET all medical histories for a specific patient
router.get('/:id', getMedicalHistory);

// POST a medical history for the registered patient
router.post('/add', protect, addMedicalHistory);

// PUT a medical history by id for a specific patient
router.put('/:id', protect, updateMedicalHistory);

// Route to get the total number of hospital visits
router.get('/hospital-visits/total', getTotalHospitalVisits);


module.exports = router;
