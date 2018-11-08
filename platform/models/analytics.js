const mongoose = require('mongoose');

// Define the database model
const AnalyticsSchema = new mongoose.Schema({
  experimentID: {
    type: String,
    required: [true, 'Experiment name is required.'],
  },
  trackingID: {
    required: [true, 'trackingId is required.'],
    type: String,
  },
  variant: {
    type: String,
    required: [ true, 'variant is required.'],
  },
  address: {
    type: String,
  },
  name: {
    type: String,
  },
  color: {
    type: String,
  },
  eventType: {
    type: String,
    required: [true, 'Experiment eventtype is required.'],
  },

  time : {
    type : Date,
    default: Date.now
  }


});

const Analytics = module.exports = mongoose.model('analytics', AnalyticsSchema);
