import axios from 'axios';
import {getEventsFromDB} from './updateEvents.js';

export function getEventbriteEvents(location, latitude, longitude, obj){
  axios.post('/events/eventbrite', {params: {location: location, latitude: latitude, longitude: longitude}})
    .then(function (response){
      console.log("got eventbrite events");
      getEventsFromDB(obj);
    })
    .catch(function(error){
      console.error(error);
    });
}

