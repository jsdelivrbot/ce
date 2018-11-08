const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const validate = require('mongoose-validator');

// Define the database model
const ExperimentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Experiment name is required.'],
    unique: true
  },
  AGroup: {
    type: String,
    required: [true, 'A Group is required.'],
    unique: true
  },
  ATraffic: {
    required: [true, 'A Traffic is required.'],
    type: Number
  },
  BGroup: {
    type: String,
    required: [true, 'B Group is required.'],
    unique: true
  },
  BTraffic: {
    required: [true, 'B Traffic is required.'],
    type: Number
  },
  time: {
    type: Date,
    default: Date.now
  }
});

// Use the unique validator plugin
ExperimentSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const Experiment = (module.exports = mongoose.model(
  'experiment',
  ExperimentSchema
));
