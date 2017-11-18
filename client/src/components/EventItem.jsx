import React from 'react';

const EventItem = ({event}) => {
  var details = event.details.eventbrite? event.details.eventbrite: event.details.yelp;
  return (
    <div>
      <img height="150" width="150" src= {details.logoUrl} alt={"Event Image Not Available"}/>
      <h1><a target="_blank" href={details.eventUrl}>{details.name}</a></h1>
      <p>{details.description}</p>
      <p>{event.startDate}</p>
      <p>{event.startTime}</p>
    </div>
  )
}

export default EventItem;
