import axios from 'axios';

export function getEventbriteEvents(location){
  axios.get('/events/eventbrite', {params: {location: location}})
    .then(function (response){
      console.log("successfully called eventbrite");
      console.log("event brite data", response);
    })
    .catch(function(error){
      console.error(error);
    });
}

