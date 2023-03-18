const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const auth = require('../middleware/auth');

router.post('/sign-in', async (req, res) => {
  const user = new User(req.body);

  try {
    const token = await user.generateAuth();
    await user.save();

    res.cookie('token', token, {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds = 1 day
      httpOnly: true,
    });

    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/log-in', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findByCredentials({ email, password });
    const token = await user.generateAuth();

    res.cookie('token', token, {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds = 1 day
      httpOnly: true,
    });

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (error) {
    res.status(400).send();
  }
});

router.post('/log-out', auth, async (req, res) => {
  try {
    req.user.token = undefined;
    res.clearCookie('token');
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/role', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).send();
    }

    res.send({ role: user.role });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
