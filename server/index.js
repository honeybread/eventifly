var express = require('express');
var path = require('path');

var port = 3000;

var app = express();
// var connection = require('http').createServer(app);



app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(port, function(){
  console.log("Server started on: " + port)
});