import React from 'react';
import ReactDOM from 'react-dom';
import EventItem from './EventItem.jsx';

const EventsList = props => {
  console.log(props);
  const eventItems = props.events.map(event => {
    return (
        <EventItem
          key={event.id}
          event={event}
          lat={event.venue.latitude}
          lng={event.venue.longitude}
        />
    );
  });

  return (
      <ul>
        {eventItems}
      </ul>
  );
}

export default EventsList;
