//Sarah Bunger

var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var dbms = require('../routes/dbms');

/* everything in this file is server responses to requests from the client---------------------- */
//server side post -------------------------------------------------------------
router.post('/', function(req, res, next){
  console.log("WHAT THE HECK");
  console.log("req body ", req.body);

  var data = req.body;
  var qty = data["quantity"];
  console.log(data["quantity"]);
  console.log(data["topping"]);
  console.log(data["notes"]);



  //add a new entry to the db
  dbms.dbquery("insert into Orders (ORDERID, MONTH, DAY, QUANTITY, TOPPING, NOTES) values (" + 42 +  "," +  "'Feb', " + 18 + ", '" +  data["quantity"] + "', " + "'" + data["topping"] + "', '" + data["notes"] + "')", 
    function(error, results){
      console.log("success???");
    }
  );

});

module.exports = router;
