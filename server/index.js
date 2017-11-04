var express = require('express');
var path = require('path');

var port = 3000;

var app = express();
// var connection = require('http').createServer(app);

app.get('/events',function(req,res){
  console.log("Server side req: "+req)
  res.send("Server is up");


});



app.use(express.static(__dirname + '/../client/dist'));


app.listen(port, function(){
  console.log("Server started on: " + port)
});