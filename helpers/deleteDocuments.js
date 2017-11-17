import axios from 'axios';
import {getEventbriteEvents} from './eventbrite.js';
import {getYelpEvents} from './yelp.js';

export function deleteAllDocumentsAndSearch(location, obj){

    axios.delete('/events')
    .then(function(response){
      obj.setState({location: location});
    })
    .then(function(response){
      getYelpEvents(obj.state.location, obj);
      getEventbriteEvents(obj.state.location, obj);
    })
    .catch(function(error){
      console.error(error);
    });

}

