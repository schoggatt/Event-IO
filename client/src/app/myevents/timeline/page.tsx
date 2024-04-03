"use client";

import EventNode from "@/app/shared/components/event-node";
import { userState } from "@/redux/features/auth.slice";
import { getEvents, selectEventsByUserId } from "@/redux/features/event.slice";
import { ResponseStatus } from "@/redux/models/response-status";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { Timeline } from "flowbite-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function MyTimeline() {
  const user = useAppSelector(userState);
  const eventState = useAppSelector((state) => state.eventReducer.value);
  const userEvents = useAppSelector((state) => selectEventsByUserId(state));

  const dispatch = useDispatch<AppDispatch>();

  // TODO: This could go in the root app so this code is not duplicated.
  useEffect(() => {
    if (eventState.status === ResponseStatus.IDLE) {
      dispatch(getEvents());
    }
  }, [eventState.status]);

  function buildTimeline() {
    const sortedEvents = userEvents
      .filter((event) => new Date(event.startDate) > new Date())
      .sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      );
    const timelineNodes: JSX.Element[] = [];

    sortedEvents.forEach((event) => {
      timelineNodes.push(<EventNode key={event.id} event={event}></EventNode>);
    });

    return timelineNodes;
  }

  return (
    <div>
      <Timeline className="w-full">{buildTimeline()}</Timeline>
    </div>
  );
}
