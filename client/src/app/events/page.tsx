"use client";

import { IEvent } from "../shared/models/event";
import SearchBar from "../shared/components/search-bar";
import { useEffect, useState } from "react";
import Card from "../shared/components/event-card";
import { mockEvents } from "../tests/mocks/events.mocks";

export default function Events() {
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    setEvents(mockEvents);
  }, []);

  function calculateRows() {
    const rows = Math.ceil(mockEvents.length / 4);
    return rows <= 5 ? rows : 5;
  }

  function generateEventTiles() {
    return events.map((event, idx) => {
      return <Card key={idx} event={event} descriptionMaxLength={200} />;
    });
  }

  // TODO: Will automatically tile by 5 rows and then us pagination.
  return (
    <div className="w-full">
      <div className="pb-4">
        <SearchBar<IEvent> setElements={setEvents} elements={events} />
      </div>
      <div className={`grid grid-cols-4 grid-rows-${calculateRows()} gap-4`}>
        {generateEventTiles()}
      </div>
    </div>
  );
}
