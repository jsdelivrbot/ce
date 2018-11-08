
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const dashboard = require('./routes/dashboard');


const config = require('./config/db');

const port = process.env.PORT || 9000;
mongoose.Promise = global.Promise;

// Connect to the database
mongoose.connect(config.db, { useNewUrlParser: true });
let db = mongoose.connection;

db.on('open', () => {
  console.log('Connection to mongodb successful!');
});

db.on('error', (err) => {
  console.log(`Database error: ${err}`);
});

// Instantiate express
const app = express();

//enables cors
app.use(cors());

// Set public folder using built-in express.static middleware
app.use(express.static('public'));

// Set body parser middleware
app.use(bodyParser.json());

//views
app.set('public', path.join(__dirname, 'public'));
//set our templating engine
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.send('hello world!')
});

// Initialize routes
app.use('/api/dashboard', dashboard);

// Use express's default error handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ err: err });
});


app.listen(port, () => {
  console.log(`analytics dashboard started on port ${port} successfully....`);
});

