import React from 'react';

const EventItem = ({event}) => {
  const date = event.start.local.split("T")[0];
  const time = event.start.local.split("T")[1];
  let image = null;
  if (event.logo){
    image =  <img height="100" width="200" src= {event.logo.url} />
  }

  return (
    <div>
      {image}
      <h1><a href={event.url}>{event.name.text}</a></h1>
      <p>{event.description.text}</p>
      <h3>{date}</h3>
      <h3>{time}</h3>
    </div>
  )
}

export default EventItem;
