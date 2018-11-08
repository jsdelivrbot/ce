const express = require('express');
const router = express.Router();
const uniqid = require('uniqid');

const experimentModel = require('../models/experiment');

router.post('/', async (req, res) => {

  let experiment_token = req.body.experiment_id;
  let experiment = [];

  try {
    experiment = await experimentModel.find({ _id: experiment_token });
    } catch (error) {
      let message = (error.message.indexOf("Cast") > -1) ? "Sorry, experiment not found. Likely an invalid Id." : "Experiment not found.";
      res.status(404).json({success:false, msg: `${message}`});
      return;
  }



  if(experiment && experiment.length > 0) {

      //todo: add a match check function to ensure urls are part of the experiement even if hash matches.
      let variant = getExperimentVariant(experiment);
      let trackerId = uniqid.process();
      res.status(200).json({ success: true, msg: 'Successfully sent ab test variant.', variant: variant, trackerId: trackerId });
    } else {
      res.status(404).json({ success: false, msg: 'An experiment does not exist for this id. Check the CE configuration panel.' });
    }

});


/**
 *
 * calculate the distribution of between control and variant based on weight.
 *  @param experiment array
 *  @return string
 * **/
 const getExperimentVariant = (experiment) => {
  let currentExperiment = experiment[0];
  const AGroup =  currentExperiment.AGroup;
  const BGroup =  currentExperiment.BGroup;
  const choices = [AGroup, BGroup];
  return choices[Math.floor(Math.random() * choices.length)];

};



module.exports = router;
