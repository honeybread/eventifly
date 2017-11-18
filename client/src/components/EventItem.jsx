import React from 'react';
import MapContainer from './Googlemaps.jsx';

const EventItem = ({event}) => {
  var details = event.details.eventbrite? event.details.eventbrite: event.details.yelp;
  return (
    <div>
      <img height="150" width="150" src= {details.logoUrl} alt={"Event Image Not Available"}/>
      <h1><a target="_blank" href={details.eventUrl}>{details.name}</a></h1>
      <p>{details.description}</p>
      <p>{event.startDate}</p>
      <p>{event.startTime}</p>
      <MapContainer  lat={event.lat} lng={event.long} name={details.name}/>
    </div>
  )
}

export default EventItem;


