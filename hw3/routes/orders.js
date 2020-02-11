//Sarah Bunger

var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var conversionHelper = require('../routes/ordersHelperFunctions')

//hard-coded data, for use before we have linked the database
var dummyData = {0: {topping: "cherry", quantity: 2}, 1: {topping: "plain", quantity: 6}, 2: {topping: "chocolate", quantity: 3}};

/* everything in this file is server responses to requests from the client---------------------- */

// response to request for the orders availbale in the dataset
router.get('/orderNumbers', function(req, res, next) {
  res.json(['0', '1', '2']);
});

router.get('/', function(req, res, next) {
  next(createError(404));
});

// response to request for data for specific categories, as specified by URL encoding
router.get('/orderData', function(req, res, next){
  console.log("Request: " + req.query.cat);
  var jsonContents = req.query.cat;

  if (jsonContents === undefined){
    next(createError(400));
    return;
  }

  jsonContents = conversionHelper(jsonContents);

  let contents = {};

  for (category of jsonContents){
    if (dummyData[category] === undefined){
      next(createError(404));
      return;
    }
    contents[category] = dummyData[category];
  }
  // return contents, a object (dictionary) containing the key/value pairs of requested categories
  res.json(contents);
});

router.post('/orders', function(req, res, next){
  var jsonContents = req.query.cat;
  console.log('what the frick', jsonContents);
  res.send(jsonContents);
});

//router.post() could just change the .get to .post, maybe 

module.exports = router;
