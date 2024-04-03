"use client";

import SearchBar from "../shared/components/search-bar";
import { useEffect, useState } from "react";
import { Event } from "../shared/models/event";
import { useDispatch } from "react-redux";
import { getEvents } from "@/redux/features/event.slice";
import { ResponseStatus } from "@/redux/models/response-status";
import { AppDispatch, useAppSelector } from "@/redux/store";
import EventGrid from "../shared/view/event-grid-view";

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

  function getContent() {
    if (eventState.status === ResponseStatus.LOADING) {
      return <div>Loading...</div>;
    } else if (eventState.status === ResponseStatus.SUCCEEDED) {
      return <EventGrid events={events}></EventGrid>;
    }
    if (eventState.status === ResponseStatus.FAILED) {
      return <div>Failed to load events</div>;
    }
  }

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
