const express = require('express');
const router = express.Router();
const experimentModel = require('../models/experiment');

router.get('/:id', (req, res) => {

  experimentModel.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: 'That experiment was not found!', error: err });
    });
});

router.get('/', (req, res) => {
  experimentModel.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ status: 500, message: `Something went wrong. ${err}` });
    });
});

router.post('/', (req, res) => {


  const validateTrafficWeight = () => {
    let trafficWeightSum = (parseInt(req.body.BTraffic) + parseInt(req.body.ATraffic));
    //validate split validation is correct.
    return trafficWeightSum === 100;
  };

  if (validateTrafficWeight()) {
    addExperiment();
  }
  else {
    return res.status(400).json({
      status: 400,
      message: 'Sorry! traffic split should add up to 100'
    });
  }


  function addExperiment() {
    // create new model
    let newExperiment = new experimentModel({
      name: req.body.name,
      AGroup: req.body.AGroup,
      ATraffic: req.body.ATraffic,
      BGroup: req.body.BGroup,
      BTraffic: req.body.BTraffic,
    });

    newExperiment.save()
      .then((result) => {
        res.json({
          success: true,
          msg: 'Successfully added a new experiment.',
          result: {
            _id: result._id,
            name: result.name,
            AGroup: result.AGroup,
            ATraffic: result.ATraffic,
            BGroup: result.BGroup,
            BTraffic: result.BTraffic,
          }
        });
      })
      .catch((err) => {
        if (err) {
          // Show failed if all else fails for some reasons
          res.status(500).json({ status: 500, message:`Something went wrong adding new experiment. ${err}`});
        }
      });

  }


});


// DELETE
router.delete('/:id', (req, res) => {

  experimentModel.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.json({
        success: true,
        msg: 'Experiment is deleted.',
        result: {
          _id: result._id,
          name: result.name,
          AGroup: result.AGroup,
          ATraffic: result.ATraffic,
          BGroup: result.BGroup,
          BTraffic: result.BTraffic,
        }
      });
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: 'Nothing to delete.' });
    });
});

module.exports = router;
