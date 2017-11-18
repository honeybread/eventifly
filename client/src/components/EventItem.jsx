import React from 'react';
import MapContainer from './Googlemaps.jsx';

const EventItem = ({event}) => {
  const date = event.start.local.split("T")[0];
  const time = event.start.local.split("T")[1];
  const lat = event.venue.latitude;
  const lng = event.venue.longitude;
  // const lon = event.location.longitude;
  // const long =

  return (
    <div>
      <img  src= {event.logo.url} />
      <h1><a href={event.url}>{event.name.text}</a></h1>
      <p>{event.description.text}</p>
      <h3>{date}</h3>
      <h3>{time}</h3>
      <MapContainer  lat={lat} lng={lng} name={event.name.text}/>

    </div>
  )
}

export default EventItem;

// <h3>{lat}, {lng}</h3>

