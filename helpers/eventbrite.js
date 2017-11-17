import axios from 'axios';
import {getEventsFromDB} from './updateEvents.js';

export function getEventbriteEvents(location, obj){
  axios.post('/events/eventbrite', {params: {location: location}})
    .then(function (response){
      console.log("got eventbrite events");
      getEventsFromDB(obj);
    })
    .catch(function(error){
      console.error(error);
    });
}

