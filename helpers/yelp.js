import axios from 'axios';
import {getEventsFromDB} from './updateEvents.js';

export function getYelpEvents (location, latitude, longitude, obj) {
    axios.post('/events/yelp', {params:{location: location, latitude: latitude, longitude: longitude}})
        .then(function(response) {
            console.log("got yelp events");
            getEventsFromDB(obj);
        })
        .catch(function(error){
            console.log(error);
        });
}

