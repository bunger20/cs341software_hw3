//Sarah Bunger

var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var conversionHelper = require('../routes/ordersHelperFunctions');
var dbms = require('../routes/dbms');


//hard-coded data, for use before we have linked the database
var dummyData = {0: {topping: "cherry", quantity: 2}, 1: {topping: "plain", quantity: 6}, 2: {topping: "chocolate", quantity: 3}};

/* everything in this file is server responses to requests from the client---------------------- */

// response to request for the orders availbale in the dataset
router.get('/orderNumbers', function(req, res, next) {
  res.json(['0', '1', '2']);
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


//server side post -------------------------------------------------------------
router.post('/', function(req, res, next){
  
  console.log("req body ", req.body);

  //req.body is a JSON with key = month and value = "Feb" (or other month)
  var selectedMonth = req.body;
  console.log("MONTH: " + selectedMonth["month"]);

  //query for data from the selected month
  dbms.dbquery("SELECT * FROM Orders WHERE month='" + selectedMonth["month"] + "'", 
    function(error, results){
      //the results that come back are JSON objects for each of the applicable entries, with each column as the key
      // console.log(results);
      // console.log(results[0]["OrderID"]);
      // console.log(results[1].OrderID);

      var toppingData = {};
      var numCherry = 0;
      var numPlain = 0;
      var numChocolate = 0;

      if (results === []){
        toppingData = {"cherry" : numCherry, "plain" : numPlain, "chocolate" : numChocolate};
        res.send(toppingData);
        return;
      }

      //iterate throught each item in results, looking at its topping type and incrementing accordingly
      for (i of results){
        // console.log(results[2]["Topping"] + "######################");
        // console.log(i.OrderID + "6666666gkgkfkk");
        // console.log(i.OrderID);
        if (i.Topping === "cherry"){
          numCherry++;
          //console.log(numCherry + "Lorem ipsum");
        }
        else if (i.Topping === "plain"){
          numPlain++;
          //console.log(numPlain + "sit dolor");

        }
        else{
          numChocolate++;
          //console.log(numChocolate + "ARGHm");
        }
      }

      //make and send back a JSON of the 3 topping types as keys and the quantity as values
      toppingData = {"cherry" : numCherry, "plain" : numPlain, "chocolate" : numChocolate};
      console.log(toppingData);
      res.send(toppingData);
    }
  );

});

module.exports = router;
