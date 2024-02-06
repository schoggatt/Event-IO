"use client";

import {
  getEvents,
  selectEventsByUserId,
  setEvents,
} from "@/redux/features/event.slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventGrid from "../shared/view/event-grid-view";
import { ResponseStatus } from "@/redux/models/response-status";
import { userState } from "@/redux/features/auth.slice";

export default function MyEvents() {
  const user = useAppSelector(userState);
  const eventState = useAppSelector((state) => state.eventReducer.value);
  const dispatch = useDispatch<AppDispatch>();

  const userEvents = useSelector((state: any) =>
    selectEventsByUserId(state.eventReducer.value, Number(user?.id))
  );

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
      return <EventGrid events={userEvents}></EventGrid>;
    }
    if (eventState.status === ResponseStatus.FAILED) {
      return <div>Failed to load events</div>;
    }
  }

  return <div>{getContent()}</div>;
}
