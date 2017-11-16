//var request = require('request');
import $ from 'jquery';

var myToken ='KB7MOMI3N42X6PLFKTQJ';
var successData = undefined;
export function getEvents(obj, location){
  $.ajax({
    method: "GET",
    url: "https://www.eventbriteapi.com/v3/events/search/?location.address=" +  JSON.stringify(location) + "&token=" + myToken + "&expand=venue",
    success: function(data){
      console.log("Success", data);
      //successData = data;
      console.log("state set location", obj.state.location);
      obj.setState({events: data.events});
    },
    error: function(err){
      console.log("Failed" , err);
    }

  })
}

export function getEventsfromCoords(position, callback){
  $.ajax({
    method: "GET",
    url: "https://www.eventbriteapi.com/v3/events/search/?location.latitude=" +  JSON.stringify(position.coords.latitude) +
    "&location.longitude=" + JSON.stringify(position.coords.longitude) + "&token=" + myToken +  "&expand=venue",
    success: function(data){
      console.log("Success", data.events);
      //successData = data;
      callback('', data.events);
    },
    error: function(err){
      console.log("Failed" , err);
      callback(err,[]);
    }

  })

}
//window.events = successData;
//window.events = getEvents;
