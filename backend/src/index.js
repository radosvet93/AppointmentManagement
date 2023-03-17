require('dotenv').config();
require('./db/index.js');
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const pino = require('pino-http')();
const cookieParser = require('cookie-parser');
const { expressjwt: jwt } = require('express-jwt');
// const ViteServer = require('vite-express');
const path = require('path');

const userRouter = require('./routes/userRouter');
const appointmentRouter = require('./routes/appointmentRouter');

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(pino);
app.use(
  jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    getToken: (req) => req.cookies.token,
  }).unless({ path: ['/', '/api/users/log-in', '/api/users/sign-in'] })
);

app.use('/api/users', userRouter);
app.use('/api/appointments', appointmentRouter);
// app.use('/api/test', (req, res) => {
//   res.cookie('token', 'token test', {
//     maxAge: 24 * 60 * 60 * 1000, // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds = 1 day
//     httpOnly: true,
//   });
//   res.send({ message: 'hello' });
// });

const resolvePath = path.resolve(__dirname + '/../../frontend/dist');
app.use(express.static(resolvePath));
app.get('*', function (req, res) {
  res.sendFile(resolvePath + '/index.html');
});

app.listen(port, () => {
  console.log(`Express listening on port ${port}`);
});
