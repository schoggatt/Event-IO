"use client";

import SearchBar from "../shared/components/search-bar";
import { useEffect, useState } from "react";
import Card from "../shared/components/event-card";
import { mockEvents } from "../tests/mocks/events.mocks";
import { Event } from "../shared/models/event";
import { useDispatch } from "react-redux";
import { getEvents } from "@/redux/features/event.slice";
import { ResponseStatus } from "@/redux/models/response-status";
import { AppDispatch, useAppSelector } from "@/redux/store";

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const eventState = useAppSelector((state) => state.eventReducer.value);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (eventState.status === ResponseStatus.IDLE) {
      dispatch(getEvents());
    }
    setEvents(eventState.events);
  }, [eventState.status, dispatch, eventState.events]);

  function calculateRows() {
    const rows = Math.ceil(mockEvents.length / 4);
    return rows <= 5 ? rows : 5;
  }

  function generateEventTiles() {
    return events.map((event, idx) => {
      return <Card key={idx} event={event} descriptionMaxLength={200} />;
    });
  }

  function getContent() {
    if (eventState.status === ResponseStatus.LOADING) {
      return <div>Loading...</div>;
    } else if (eventState.status === ResponseStatus.FAILED) {
      return <div>Failed to load events</div>;
    } else if (
      eventState.status === ResponseStatus.SUCCEEDED &&
      eventState.events.length > 0
    ) {
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

  // TODO: Will automatically tile by 5 rows and then us pagination.
  return (
    <div className="w-full">
      <div className="pb-4">
        <SearchBar<Event>
          allElements={eventState.events}
          setElements={setEvents}
        />
      </div>
      {getContent()}
    </div>
  );
}
