var express = require('express');
var path = require('path');
var port = 3000;
var app = express();
var bodyParser =  require('body-parser');

// var connection = require('http').createServer(app);
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/events',function(req,res){
  //console.log("Server side req: "+req.body.location)
  res.send(req.query);


});

app.listen(port, function(){
  console.log("Server started on: " + port)
});