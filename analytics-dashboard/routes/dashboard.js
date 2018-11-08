const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const config = require('../config/db');
mongoose.connect(config.db, { useNewUrlParser: true });

let db = mongoose.connection;
let Analytics = db.collection("analytics");

//NOT VERY RESTFUL!
router.get("/experiment/:id/:agroup/:bgroup", async (req, res) => {
  const experimentId = req.params.id;
  const A_Group = req.params.agroup;
  const B_Group = req.params.bgroup;

  db.collection("analytics").find({"experimentID":experimentId}).toArray(function(err, result) {

  console.log(result)
    // db hiccup
    if (err) {
      res.render('dashboard',{err: err});
      // db results came back with records
    } else if (result.length > 0) {

      // Total pageviews
      let pageViews = result.filter(function(document){
        return document.eventType === 'pageview'
      });

      // Grouped Page Views
      let groupAResults = result.filter(function(document){
        return document.variant === A_Group && document.eventType === 'pageview';
      });

      let groupBResults = result.filter(function(document){
        return document.variant === B_Group && document.eventType === 'pageview';
      });

      // Grouped conversions
      let groupAConverted = result.filter(function (document) {
        return document.eventType === 'submit' && document.variant === A_Group;
      });

      let groupBConverted = result.filter(function (document) {
        return document.eventType === 'submit' && document.variant === B_Group;
      });

      const percentageOfGroupAConversions = Math.round(((groupAConverted.length / pageViews.length) * 100));
      const percentageOfGroupBConversions = Math.round(((groupBConverted.length / pageViews.length) * 100));


      console.log({
        experimentId: experimentId,
        views: pageViews.length,
        groupACount: groupAResults.length,
        groupBCount : groupBResults.length,
        groupAConverted : groupAConverted.length,
        groupBConverted : groupBConverted.length,
        percentageOfGroupBConversions: percentageOfGroupBConversions,
        percentageOfGroupAConversions: percentageOfGroupAConversions,
      });

      console.log('sending back data to analytics dashboard..');
      res.render('dashboard',{
        experimentId: experimentId,
        views: pageViews.length,
        groupACount: groupAResults.length,
        groupBCount : groupBResults.length,
        groupAConverted : groupAConverted.length,
        groupBConverted : groupBConverted.length,
        percentageOfGroupBConversions: percentageOfGroupBConversions,
        percentageOfGroupAConversions: percentageOfGroupAConversions,
      });
    } else if (result.length === 0) {
      res.render('dashboard',{
        experimentId: 0,
        views: 0,
        groupACount: 0,
        groupBCount : 0,
        groupAConverted : 0,
        groupBConverted : 0,
        percentageOfGroupAConversions : 0,
        percentageOfGroupBConversions : 0,
      });
    }
  })
});






module.exports = router;