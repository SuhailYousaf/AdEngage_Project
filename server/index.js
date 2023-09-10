const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
require('dotenv').config();
dotenv.config();
const app = express();
dotenv.config();

const userRouter = require('./routes/user.js');

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.get('/test', (req, res) => {
  res.json('test');
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', userRouter);



mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB has been started successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
