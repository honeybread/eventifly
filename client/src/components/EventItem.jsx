import React from 'react';

const EventItem = ({event}) => {
  return (
    <div>
      {event.name.text}
    </div>
  )
}

export default EventItem;
