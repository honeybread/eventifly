var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;
var app = express();
var router = express.Router()
var bodyParser = require('body-parser');
//var request = require('request');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/events',function(req,res){
  console.log("came to /events get")
  console.log("on Server side: Events", req.query);
  res.sendStatus(200);


});

app.listen(port, function(){
  console.log("Server started on: " + port)
});
