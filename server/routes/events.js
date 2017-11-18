var express = require('express');
var router = express.Router();
var axios = require('axios');
var keys = require('./../../config/keys');
var yelp = require('yelp-fusion');
var eventsDB = require('./../../database/index.js');
var $ = require('jquery');


router.get('/',function(req,res){
    
    eventsDB.eventsModel.find(function(error, events){
        if (error) return console.error(error);
        res.json(events);
    });
    eventsDB.eventsModel.find()
  });
  

router.delete('/', function(req, res){
    eventsDB.eventsModel.remove(function(error, removed){
        if (error) console.error(error);
        res.sendStatus(200);
    })
    
});

router.post('/yelp', function(req, res){
    var location = req.body.params.location;
    var latitude = req.body.params.latitude;
    var longitude = req.body.params.longitude;
    

    var clientId = keys.yelpClientId;
    var clientSecret = keys.yelpClientSecret;

    yelp.accessToken(clientId, clientSecret)
        .then(function(response){    
            var access_token = response.jsonBody.access_token;

            if (location) {
                var url = 'https://api.yelp.com/v3/events?location='.concat(location);
                var start_date = Math.round((new Date()).getTime() / 1000);
                url = url.concat('&start_date=' + start_date.toString());

            } else {
                var url = 'https://api.yelp.com/v3/events?latitude='.concat(latitude);
                url = url.concat('&longitude=' + longitude);
            }

            url = url.concat('&limit=50');
            
            axios.get(url, 
            {headers:{Authorization: "Bearer ".concat(access_token)}})
                .then(function(response){

                var events = response.data.events;
                for(var i = 0; i < events.length; i++) {
                    var today = new Date();
                    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    var time = today.getHours() + ":" + today.getMinutes();
                    var currentDateTime = date+' '+time;
                    
                    
                    var startDate = events[i].time_start === null? "": events[i].time_start.split(" ")[0];
                    var startTime = events[i].time_start === null? "": events[i].time_start.split(" ")[1];
                    var endDate = events[i].time_end === null? "": events[i].time_end.split(" ")[0];
                    var endTime = events[i].time_end === null? "": events[i].time_end.split(" ")[1];
                    var lat = events[i].latitude === null? "": [events[i].latitude.toString().split('.')[0], events[i].latitude.toString().split('.')[1].slice(0, 4)].join('.');
                    var long = events[i].longitude === null? "": [events[i].longitude.toString().split('.')[0], events[i].longitude.toString().split('.')[1].slice(0, 4)].join('.');
                    
                    var name = events[i].name? events[i].name: "";
                    var description = events[i].description? events[i].description: "";
                    var eventUrl = events[i].event_site_url? events[i].event_site_url: "";
                    var logoUrl = events[i].image_url? events[i].image_url: "";

                    if ((startDate + " " + startTime) < currentDateTime) {
                        continue;
                    }
                    
                    eventsDB.eventsModel.findOneAndUpdate(
                        {startDate: startDate, startTime: startTime, lat: lat, long: long},
                        {$set:{
                            startDate: startDate,
                            startTime: startTime,
                            endDate: endDate,
                            endTime: endTime,
                            lat: lat,
                            long: long,
                            details: {yelp: {name: name, 
                                description: description,
                                eventUrl: eventUrl,
                                logoUrl: logoUrl
                            }}
                        }},
                        {safe: true, upsert: true, new: true},
                        function(error, model) {
                            if (error) console.error(error);
                        }
                    )       
                }
                res.sendStatus(200);
                })
                .catch(function(error){
                console.error(error);
                });
            
        })
        .catch(function(error){
            console.error(error);
        });
});



router.post('/eventbrite', function(req, res){
    var location = req.body.params.location;
    var latitude = req.body.params.latitude;
    var longitude = req.body.params.longitude;
    
    var myToken = keys.eventbriteToken;
    var successData = undefined;

    if (location) {
        var url = 'https://www.eventbriteapi.com/v3/events/search/?location.address='.concat(location);
    } else {
        var url = 'https://www.eventbriteapi.com/v3/events/search/?location.latitude='.concat(latitude);
        url = url.concat('&location.longitude=' + longitude);
    }
    url = url + "&token=" + myToken + "&expand=venue";
    
    
    axios.get(url)
        .then(function(response) {

            var events = response.data.events;
            for(var i = 0; i < events.length; i++) {
                
                var today = new Date();
                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                var time = today.getHours() + ":" + today.getMinutes();
                var currentDateTime = date+' '+time;

                var startDate = events[i].start.local === null? "": events[i].start.local.split("T")[0];
                var startTime = events[i].start.local === null? "": events[i].start.local.split("T")[1].slice(0, -3);;
                var endDate = events[i].end.local === null? "": events[i].end.local.split("T")[0];
                var endTime = events[i].end.local === null? "": events[i].end.local.split("T")[1].slice(0, -3);
                var lat = events[i].venue.latitude === null? "": [events[i].venue.latitude.split('.')[0], events[i].venue.latitude.split('.')[1].slice(0, 4)].join('.');
                var long = events[i].venue.longitude === null? "": [events[i].venue.longitude.split('.')[0], events[i].venue.longitude.split('.')[1].slice(0, 4)].join('.');
                
                var name = events[i].name? events[i].name.text: "";
                var description = events[i].description? events[i].description.text: "";
                var eventUrl = events[i].url? events[i].url: "";
                var logoUrl = events[i].logo? events[i].logo.url: "";

                if ((startDate + " " + startTime) < currentDateTime) {
                    continue;
                }


                eventsDB.eventsModel.findOneAndUpdate(
                    {startDate: startDate, startTime: startTime, lat: lat, long: long},
                    {$set:{
                        startDate: startDate,
                        startTime: startTime,
                        endDate: endDate,
                        endTime: endTime,
                        lat: lat,
                        long: long,
                        details: {eventbrite: {name: name, 
                            description: description,
                            eventUrl: eventUrl,
                            logoUrl: logoUrl
                        }}
                    }},
                    {safe: true, upsert: true, new: true},
                    function(error, model) {
                        if (error) console.error(error);
                    }
                )  

            }
            res.sendStatus(200);
        })
        .catch(function(error) {
            console.error(error);
        });
});
  
module.exports = router;