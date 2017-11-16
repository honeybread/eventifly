var express = require('express');
var path = require('path');
var port = 3000;
var app = express();
var router = express.Router()
var bodyParser = require('body-parser');
var axios = require('axios');
var config = require('./../config.js');
//var request = require('request');

var yelp = require('yelp-fusion');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/events',function(req,res){
  console.log("came to /events get")
  console.log("on Server side: Events", req.query);
  res.sendStatus(200);

});


app.get('/events/yelp', function(req, res){
  var location = req.query.location;
  var clientId = config.yelp.clientId;
  var clientSecret = config.yelp.clientSecret;

  yelp.accessToken(clientId, clientSecret)
      .then(function(response){
          console.log(response);
          var access_token = response.jsonBody.access_token;
          var url = 'https://api.yelp.com/v3/events?location='.concat(location)
          url = url.concat('&limit=50')
          axios.get(url, 
          {headers:{Authorization: "Bearer ".concat(access_token)}})
            .then(function(response){
              console.log("sucess yelp", response.data);
              res.send(response.data);
            })
            .catch(function(error){
              console.error(error);
            });
          
      })
      .catch(function(error){
        console.error(error);
      });
});


app.listen(port, function(){
  console.log("Server started on: " + port)
});

