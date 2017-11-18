var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;
var app = express();
var router = express.Router()
var bodyParser = require('body-parser');
var events = require('./routes/events.js');


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/events', events);


app.listen(port, function(){
  console.log("Server started on: " + port)
});
