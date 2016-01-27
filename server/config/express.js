var path = require('path'),  
    express = require('express'), 
    router = express.Router(),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    listingsRouter = require('../routes/listings.server.routes'), 
    getCoordinates = require('../controllers/coordinates.server.controller.js');

module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri);

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware 
  app.use(bodyParser.json());

  /* server wrapper around Google Maps API to get latitude + longitude coordinates from address */
  app.post('/api/coordinates', getCoordinates, function(req, res) {
    res.send(req.results);
  });

  /* serve static files */
<<<<<<< HEAD
  app.use(express.static('client'));

  /* use the listings router for requests to the api */
  app.use('/api/listings', listingsRouter, function(res,req,next) {
	res.sendStatus(200);
	next();
  });
  
  /* go to homepage for all routes not specified */ 
  app.use(function(req, res) {
=======
  app.use(express.static('public'));

  /* use the listings router for requests to the api */
  router.use('/api/listings', listingsRouter);

  /* go to homepage for all routes not specified */ 
  router.use(function(req, res) {
>>>>>>> a970a7d044b9b3380e1b4628441ed291676cc344
    res.sendFile(path.join(__dirname + '/client/index.html'));
  });

  return app;
};  
