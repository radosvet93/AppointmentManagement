require('dotenv').config();
require('./db/index.js');
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const pino = require('pino-http')();
const cookieParser = require('cookie-parser');
const jwt = require('./middleware/jwt.js');
const errorHandler = require('./helpers/errorHandler.js');

const userRouter = require('./routes/userRouter');
const appointmentRouter = require('./routes/appointmentRouter');

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(pino);
app.use(jwt());

app.use('/api/users', userRouter);
app.use('/api/appointments', appointmentRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Express listening on port ${port}`);
});
