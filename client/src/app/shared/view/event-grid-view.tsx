import React from "react";
import { Event } from "../models/event";
import EventCard from "../components/event-card";

interface IEventGridProps {
  events: Event[];
}

export default function EventGrid(props: IEventGridProps) {
  function calculateRows() {
    const rows = Math.ceil(props.events.length / 4);
    return rows <= 5 ? rows : 5;
  }

  function generateEventTiles() {
    return props.events.map((event, idx) => {
      return <EventCard key={idx} event={event} descriptionMaxLength={200} />;
    });
  }

  if (props.events.length > 0) {
    return (
      <div className={`grid grid-cols-4 grid-rows-${calculateRows()} gap-4`}>
        {generateEventTiles()}
      </div>
    );
  } else {
    return (
      <div>
        <h5 className="text-xl">No events found.</h5>
      </div>
    );
  }
}
