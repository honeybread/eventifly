//var request = require('request');
import $ from 'jquery';

var myToken ='Please fill in your token';
export function getEvents(){
  $.ajax({
    method: "GET",
    url: "http://www.eventbriteapi.com/v3/events/search/?token={" + myToken +"}",
    success: function(data){
      console.log("Sucess");
      console.log(data);
    },
    error: function(err){
      console.log("Failed" , err);
    }

  })
}

//window.events = getEvents;