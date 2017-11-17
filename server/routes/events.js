var express = require('express');
var router = express.Router();
var axios = require('axios');
var config = require('./../../config.js');
var yelp = require('yelp-fusion');
var eventsDB = require('./../../database/index.js');


router.get('/',function(req,res){
    console.log("came to /events get")
    console.log("on Server side: Events", req.query);
    res.sendStatus(200);
  
  });
  
  
router.get('/yelp', function(req, res){
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

            var events = response.data.events;
            for(var i = 0; i < events.length; i++) {
                
                var startDate = events[i].time_start === null? "": events[i].time_start.split(" ")[0];
                var startTime = events[i].time_start === null? "": events[i].time_start.split(" ")[1];
                var endDate = events[i].time_end === null? "": events[i].time_end.split(" ")[0];
                var endTime = events[i].time_end === null? "": events[i].time_end.split(" ")[1];
                var lat = events[i].latitude === null? "": [events[i].latitude.toString().split('.')[0], events[i].latitude.toString().split('.')[1].slice(0, 4)].join('.');
                var long = events[i].longitude === null? "": [events[i].longitude.toString().split('.')[0], events[i].longitude.toString().split('.')[1].slice(0, 4)].join('.');

                var newEvent = new eventsDB.eventsModel({
                    startDate: startDate,
                    startTime: startTime,
                    endDate: endDate,
                    endTime: endTime,
                    lat: lat,
                    long: long,
                    details: {yelp: {name: events[i].name, 
                        description: events[i].description,
                        url: events[i].event_site_url
                    }}
                })

                newEvent.save(function(error, newEvent){
                    if (error) console.error(error);
                    console.log("New Event of Yelp saved!")
                })
            }
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

router.get('/eventbrite', function(req, res){
    var location = req.query.location;
    var myToken = config.eventbrite.token;
    var successData = undefined;
    var url = "https://www.eventbriteapi.com/v3/events/search/?location.address=" +  JSON.stringify(location) + "&token=" + myToken + "&expand=venue";    
    axios.get(url)
        .then(function(response) {

            var events = response.data.events;
            for(var i = 0; i < events.length; i++) {
                
                var startDate = events[i].start.local === null? "": events[i].start.local.split("T")[0];
                var startTime = events[i].start.local === null? "": events[i].start.local.split("T")[1].slice(0, -3);;
                var endDate = events[i].end.local === null? "": events[i].end.local.split("T")[0];
                var endTime = events[i].end.local === null? "": events[i].end.local.split("T")[1].slice(0, -3);
                var lat = events[i].venue.latitude === null? "": [events[i].venue.latitude.split('.')[0], events[i].venue.latitude.split('.')[1].slice(0, 4)].join('.');
                var long = events[i].venue.longitude === null? "": [events[i].venue.longitude.split('.')[0], events[i].venue.longitude.split('.')[1].slice(0, 4)].join('.');
             
                var newEvent = new eventsDB.eventsModel({
                    startDate: startDate,
                    startTime: startTime,
                    endDate: endDate,
                    endTime: endTime,
                    lat: lat,
                    long: long,
                    details: {eventbrite: {name: events[i].name, 
                        description: events[i].description,
                        url: events[i].event_site_url
                    }}
                })

                newEvent.save(function(error, newEvent){
                    if (error) console.error(error);
                    console.log("New Event of Eventbrite saved!")
                })
            }
            res.send(response.data);
        })
        .catch(function(error) {
            console.error(error);
        });
});
  
module.exports = router;