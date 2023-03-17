const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const Appointment = require('./appointmentModel');

const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,
      trim: true,
      required: true,
    },
    token: String,
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.virtual('appointments', {
  ref: 'Appointment',
  localField: '_id',
  foreignField: 'owner',
});

UserSchema.methods.generateAuth = async function () {
  const user = this;

  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1 day' });

  user.token = token;

  await user.save();

  return token;
};

UserSchema.statics.findByCredentials = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Unable to login!');
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    throw new Error('Unable to login!');
  }

  return user;
};

UserSchema.pre('save', async function () {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
});

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.__v;

  if (userObject.role !== 'admin') {
    delete userObject.role;
  }

  return userObject;
};

// Delete user appointments when user is removed
UserSchema.pre('remove', async function (next) {
  const user = this;
  await Appointment.deleteMany({ owner: user._id });

  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
