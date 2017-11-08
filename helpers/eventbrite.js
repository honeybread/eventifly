//var request = require('request');
import $ from 'jquery';

var myToken ='KB7MOMI3N42X6PLFKTQJ';
var successData = undefined;
export function getEvents(obj){
  $.ajax({
    method: "GET",
    url: "https://www.eventbriteapi.com/v3/events/search/?token=" + myToken,
    success: function(data){
      console.log("Sucess");
      //successData = data;
      obj.setState({'events': data});
    },
    error: function(err){
      console.log("Failed" , err);
    }

  })
}

window.events = successData;
//window.events = getEvents;

