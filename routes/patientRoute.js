const express = require('express');
const router = express.Router();

const {
  getpatient,
  addpatient,
  updatepatient,
} = require('../controllers/patientControlers');

const { protect } = require('../middlewares/authmw');
const { json } = require('body-parser');

router.route('/').get(protect, (req, res) => {
  if (!req.user) {
    return res.json([]);
  }
  getpatient(req, res);
});

router.route('/add').post(protect, (req, res) => {
  // if (!req.user) {
  //   res.status(401).json('Not authorized.!!!!!!!!');
  // } else {

  addpatient(req, res);
  // }
});

router.route('/:id').put(protect, (req, res) => {
  if (!req.user) {
    res.status(401).json('Not authorized');
  } else {

    updatepatient(req, res);
  }
});

module.exports = router;
