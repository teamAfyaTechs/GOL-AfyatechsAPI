const express = require('express');
const router = express.Router();

const {
  getpatient,
  addpatient,
  updatepatient,
} = require('../controllers/patientControlers');

const { protect } = require('../middlewares/authmw');

router.route('/').get(protect, (req, res) => {
  if (!req.user) {
    return res.json([]);
  }
  getpatient(req, res);
});

router.route('/add').post(protect, (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }
  addpatient(req, res);
});

router.route('/:id').put(protect, (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }
  updatepatient(req, res);
});

module.exports = router;
