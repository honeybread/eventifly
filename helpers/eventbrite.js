import $ from 'jquery';
import auth from './../config.js'

var myToken = auth.eventbrite.token;
var successData = undefined;
export function getEvents(obj, location){
  $.ajax({
    method: "GET",
    url: "https://www.eventbriteapi.com/v3/events/search/?location.address=" +  JSON.stringify(location) + "&token=" + myToken,
    success: function(data){
      console.log("Success", data);
 
      console.log("state set location", obj.state.location);
      obj.setState({events: data.events});
    },
    error: function(err){
      console.log("Failed" , err);
    }

  })
}

window.events = successData;

