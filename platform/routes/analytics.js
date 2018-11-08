const express = require('express');
const router = express.Router();

const analyticsModel = require('../models/analytics');

router.post('/', (req, res) => {

  //write to analytics db
  let analyticEvent = new analyticsModel(req.body);

  analyticEvent.save()
    .then(() => {
      res.status(200).json({msg: 'analytic event successful!'});
    })
    .catch((err) => {
      if (err) {
        // Show failed if all else fails for some reasons
        res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
      }
    });
});



module.exports = router;
