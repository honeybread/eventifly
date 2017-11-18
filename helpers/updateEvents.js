
import $ from 'jquery';

export function getEventsFromDB(obj) {
    $.get('/events')
      .then(function(response){
        if (response.length > 0 && (obj.state.events.length === 0 || JSON.stringify(obj.state.events) !== JSON.stringify(response))){
          obj.setState({events: response}, () => {
            obj.setState({filteredEvents: obj.state.events});
          });
        }
        console.log("Events updated", response);
      })
      .catch(function(error){
        console.error(error);
      });


  }