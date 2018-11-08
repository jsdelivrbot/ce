const express = require('express');
const router = express.Router();
const path = require('path');

const analyticsModel = require('../models/analytics');
const hostname = process.env.host || 'http://localhost:3000';


router.get("/experiment/:id", (req, res) => {


});

module.exports = router;