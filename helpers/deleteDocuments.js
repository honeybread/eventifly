import axios from 'axios';
import {getEventbriteEvents} from './eventbrite.js';
import {getYelpEvents} from './yelp.js';

export function deleteAllDocumentsAndSearch(location, latitude, longitude, obj){
  
    axios.delete('/events')
    .then(function(response){
      if (location) {
        obj.setState({location: location});
      } else {
        obj.setState({latitude: latitude, longitude: longitude});
      }
      
      getYelpEvents(location, latitude, longitude, obj);
      getEventbriteEvents(location, latitude, longitude, obj);
      
    })
    .catch(function(error){
      console.error(error);
    });

}

