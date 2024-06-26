"use client";

import {
  eventSliceState,
  getEvents,
  selectEventsByUserId,
} from "@/redux/features/event.slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import EventGrid from "../shared/view/event-grid-view";
import { ResponseStatus } from "@/redux/models/response-status";
import { userState } from "@/redux/features/auth.slice";
import { Event } from "../shared/models/event";
import CreateEventModal from "../shared/components/create-event-modal";
import { Button } from "flowbite-react";
import { HiPlus } from "react-icons/hi";

export default function MyEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const user = useAppSelector(userState);
  const eventState = useAppSelector(eventSliceState);
  const userEvents = useAppSelector((state) => selectEventsByUserId(state));

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (eventState.status === ResponseStatus.IDLE) {
      dispatch(getEvents());
    }
    if (userEvents.length > 0 && user) {
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

  function toggleCreateModal() {
    setIsCreateModalOpen(!isCreateModalOpen);
  }

  return (
    <div>
      <Button className="mr-2 mt-2 mb-2" onClick={toggleCreateModal}>
        Create Event
        <HiPlus className="ml-2"></HiPlus>
      </Button>
      <CreateEventModal
        toggleVisible={toggleCreateModal}
        isVisible={isCreateModalOpen}
      ></CreateEventModal>
      {getContent()}
    </div>
  );
}
