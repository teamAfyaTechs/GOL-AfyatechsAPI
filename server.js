const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectDB = require("./config/db")
const dotenv = require('dotenv').config();
const cors = require('cors');

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/patients', require('./routes/patientRoute'));
app.use('/api/users', require('./routes/userRoute'));
app.use('/api/medicalhistory', require('./routes/medicalHistoryRoutes'))

app.use('/', function (req, res) {
  res.status(200).send(`Welcome to Api`);
});

// Connect to database
connectDB().then(() => {
  console.log('Connected to MongoDB');
  // listening port
  app.listen(port, () => {
    console.log(`app is live at ${port}`);
    // console.log(process.env.JWT_SECRET);
  });
  //   console.log(req.headers);

}).catch((err) => {
  console.error(err);
});

