"use client";

import EventOverview from "@/app/shared/components/event-overview";
import { Event } from "@/app/shared/models/event";
import { getEvents, selectEventById } from "@/redux/features/event.slice";
import { ResponseStatus } from "@/redux/models/response-status";
import { AppDispatch, RootState, useAppSelector } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Event({ params }: { params: { eventId: string } }) {
  const event = useSelector((state: RootState) =>
    selectEventById(state.eventReducer.value, Number(params.eventId))
  );

  const eventState = useAppSelector((state) => state.eventReducer.value);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (
      eventState.status === ResponseStatus.IDLE &&
      eventState.events.length === 0
    ) {
      dispatch(getEvents());
    }
  }, [dispatch, eventState.status, eventState.events, params.eventId]);

  // TODO: Need to add a boundary here for if it no longer exists
  return (
    <div className="flex justify-center text-center align-center w-full">
      {event && <EventOverview event={event} />}
    </div>
  );
}
