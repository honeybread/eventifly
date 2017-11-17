import React from 'react';
import ReactDOM from 'react-dom';
import EventItem from './EventItem.jsx';

const EventsList = props => {
  console.log(props);
  const eventItems = props.events.map(event => {
    return (
        <EventItem
          key={event._id}
          event={event}
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
