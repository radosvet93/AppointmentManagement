const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const admin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await User.findOne({ _id: decoded._id, token, role: 'admin' });

    if (!admin) {
      throw new Error();
    }

    req.user = admin;
    req.token = token;

    next();
  } catch (error) {
    res.status(401).send({ message: 'Not authenticated' });
  }
};

module.exports = admin;
