
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const router = express.Router();

const experiment = require('./routes/experiment');
const traffic = require('./routes/traffic');
const analytics = require('./routes/analytics');
const dashboard = require('./routes/dashboard');

const config = require('./config/db');

const port = process.env.PORT || 3000;
mongoose.Promise = global.Promise;

// Connect to the database
mongoose.connect(config.db);
let db = mongoose.connection;

db.on('open', () => {
  console.log('Connection to mongodb successful!');
});

db.on('error', (err) => {
  console.log(`Database error: ${err}`);
});

// Instantiate express
const app = express();

//set our templating engine
app.set('view engine', 'ejs');


//enables cors
//todo: only allow localhost:8000 Cross domain!
app.use(cors());

// Set public folder using built-in express.static middleware
app.use(express.static('public'));

// Set body parser middleware
app.use(bodyParser.json());


// Initialize routes
app.use('/api/experiment/', experiment);
app.use('/api/traffic/', traffic);
app.use('/api/analytics/', analytics);

// Use express's default error handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ err: err });
});

app.listen(port, () => {
  console.log(`Started Conscious Experiment platform on port ${port} successfully....`);
});


