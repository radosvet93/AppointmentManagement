const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointmentModel');
const User = require('../models/userModel');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// ----- Admin -----

// Get all appointments
router.get('/all', admin, async (req, res) => {
  const appointments = await Appointment.find({}).sort({ date: 'asc' });
  try {
    res.send(appointments);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Create appointment for user
router.post('/:id/create', admin, async (req, res) => {
  const id = req.params.id;
  const appointment = new Appointment({
    ...req.body,
    owner: id,
  });

  try {
    await appointment.save();
    res.status(201).send(appointment);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update appointment for admin
router.patch('/:id/update/:owner', admin, async (req, res) => {
  const _id = req.params.id;
  const owner = req.params.owner;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'description', 'date'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ message: 'Invalid updates!' });
  }

  try {
    const appointment = await Appointment.findById(_id);

    if (!appointment) {
      return res.status(404).send();
    }

    updates.forEach((update) => (appointment[update] = req.body[update]));
    appointment.owner = owner;
    await appointment.save();
    res.send(appointment);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete appointment
router.delete('/:id/delete', admin, async (req, res) => {
  const _id = req.params.id;

  try {
    const appointment = await Appointment.findByIdAndDelete(_id);

    if (!appointment) {
      return res.status(404).send();
    }
    res.send(appointment);
  } catch (error) {
    res.status(400).send();
  }
});

// ----- User -----

// Create appointment
router.post('/create', auth, async (req, res) => {
  const appointment = new Appointment({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await appointment.save();
    res.status(201).send(appointment);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', auth, async (req, res) => {
  const appointments = await Appointment.find({ owner: req.user._id });
  try {
    res.send(appointments);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/:id', auth, async (req, res) => {
  const _id = req.params.id;
  const isAdmin = await User.findOne({ _id: req.user._id, role: 'admin' });

  try {
    let appointment = await Appointment.findOne({ _id, owner: req.user._id });
    if (isAdmin) {
      appointment = await Appointment.findOne({ _id });
    }

    if (!appointment) {
      return res.status(404).send();
    }
    res.send(appointment);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update appointment for user
router.patch('/:id/update', auth, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'description', 'date'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ message: 'Invalid updates!' });
  }

  try {
    const appointment = await Appointment.findOne({ _id, owner: req.user._id });

    if (!appointment) {
      return res.status(404).send();
    }

    updates.forEach((update) => (appointment[update] = req.body[update]));
    await appointment.save();
    res.send(appointment);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete appointment
router.delete('/:id/cancel', auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const appointment = await Appointment.findOneAndDelete({ _id, owner: req.user._id });

    if (!appointment) {
      return res.status(404).send();
    }
    res.send(appointment);
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = router;
