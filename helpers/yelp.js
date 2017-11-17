import axios from 'axios';
import {getEventsFromDB} from './updateEvents.js';

export function getYelpEvents (location, obj) {
    axios.post('/events/yelp', {params:{location: location}})
        .then(function(response) {
            console.log("got yelp events");
            getEventsFromDB(obj);
        })
        .catch(function(error){
            console.log(error);
        });
}

