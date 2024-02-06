"use client";

import {
  getEvents,
  selectEventsByUserId,
  setEvents,
} from "@/redux/features/event.slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import EventGrid from "../shared/view/event-grid-view";
import { ResponseStatus } from "@/redux/models/response-status";
import { userState } from "@/redux/features/auth.slice";
import { Event } from "../shared/models/event";

export default function MyEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const user = useAppSelector(userState);
  const eventState = useAppSelector((state) => state.eventReducer.value);
  const dispatch = useDispatch<AppDispatch>();

  // TODO: I need to check how to manage change better than useEffect. Also, I should be able to use a custom selector.
  useEffect(() => {
    if (eventState.status === ResponseStatus.IDLE) {
      dispatch(getEvents());
    }
    if (eventState.events.length > 0 && user) {
      const userEvents = eventState.events.filter((event) =>
        event.userEvents.some((userEvent) => userEvent.userId === user?.id)
      );
      setEvents(userEvents);
    }
  }, [eventState.status, dispatch, eventState.events, user]);

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

  return <div>{getContent()}</div>;
}
