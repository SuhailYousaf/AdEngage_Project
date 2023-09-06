const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

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


const mongoURI ='mongodb://0.0.0.0:27017/AdEngage';

mongoose
  .connect(mongoURI, {
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