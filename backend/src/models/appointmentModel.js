const mongoose = require('mongoose');
const { Schema } = mongoose;

const AppointmentSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      validate: {
        validator: function (date) {
          const currentTime = date.getTime();
          const today = Date.now();
          const hundredDays = today + 100 * 24 * 60 * 60 * 1000;
          return currentTime >= today && currentTime < hundredDays;
        },
        message: 'The appointment does not have a valid date, please change the date',
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Appointment', AppointmentSchema);
