//var request = require('request');
import $ from 'jquery';

var myToken ='KB7MOMI3N42X6PLFKTQJ';
var successData = undefined;
export function getEvents(obj, location){
  $.ajax({
    method: "GET",
    url: "https://www.eventbriteapi.com/v3/events/search/?location.address=" +  JSON.stringify(location) + "&token=" + myToken,
    success: function(data){
      console.log("Sucess");
      //successData = data;
      console.log("state set location", obj.state.location);
      obj.setState({'events': data});
    },
    error: function(err){
      console.log("Failed" , err);
    }

  })
}

window.events = successData;
//window.events = getEvents;

