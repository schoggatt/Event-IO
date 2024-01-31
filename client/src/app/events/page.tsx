"use client";

import SearchBar from "../shared/components/search-bar";
import { useEffect, useState } from "react";
import Card from "../shared/components/event-card";
import { mockEvents } from "../tests/mocks/events.mocks";
import EventService from "../shared/services/events/event.service";
import { Event } from "../shared/models/event";

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const eventService = new EventService();

  useEffect(() => {
    async function fetchEvents() {
      const events = await eventService.getEvents();
      setEvents(events);
    }

    fetchEvents();
  });

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
        <SearchBar<Event> setElements={setEvents} elements={events} />
      </div>
      <div className={`grid grid-cols-4 grid-rows-${calculateRows()} gap-4`}>
        {generateEventTiles()}
      </div>
    </div>
  );
}
