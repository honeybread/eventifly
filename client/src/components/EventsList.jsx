import React from 'react';
import ReactDOM from 'react-dom';
import EventItem from './EventItem.jsx';
import DateSort from './FilterDateSort.jsx';

const EventsList = props => {
  console.log(props);

  const eventItems = props.events.map((event) => {
    return (
        <EventItem
          key={event._id}
          event={event}
        />
    );
  });

  return (
    <div>
      <div>
        <DateSort eventItemsLength={eventItems.length} onDateSort={props.onDateSort}/>
      </div>
      <ul>
        {eventItems}
      </ul>
    </div>
  );
}

export default EventsList;
