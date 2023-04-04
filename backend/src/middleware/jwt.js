const { expressjwt } = require('express-jwt');
const publicPaths = require('../constants/index.js');

function jwt() {
  return expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    getToken: (req) => req.cookies.token,
  }).unless({
    path: publicPaths,
  });
}

module.exports = jwt;
