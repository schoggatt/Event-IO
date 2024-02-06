import React from "react";
import { Event } from "../models/event";
import CountdownTimer from "./countdown-timer";
import UserTile from "./user-tile";
import EventService from "../services/events/event.service";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { UserEvent } from "../models/user-event";
import { useDispatch } from "react-redux";
import { addAttendee } from "@/redux/features/event.slice";
import { userState } from "@/redux/features/auth.slice";

interface IEventOverviewProps {
  event: Event;
}
// Probably should only show a max of like 10 RSVP'd users
function EventOverview(props: IEventOverviewProps) {
  const user = useAppSelector(userState);
  const dispatch = useDispatch<AppDispatch>();

  function handleJoinEvent() {
    if (user) {
      const userEvent: UserEvent = {
        id: 0,
        eventId: props.event.id,
        userId: user.id!,
      };
      dispatch(addAttendee(userEvent));
    }
  }

  // function handleLeaveEvent() {
  //   if (user) {
  //     const userEvent: UserEvent = {
  //       id: 0,
  //       eventId: props.event.id,
  //       userId: user.id!,
  //     };
  //     dispatch(addAttendee(userEvent));
  //   }
  // }

  function allowJoinEvent() {
    if (user) {
      return props.event.users.filter((u) => u.id === user.id).length === 0;
    }
    return false;
  }

  return (
    <div className="justify-center text-center w-1/2">
      <h1 className="text-4xl mb-3">{props.event.name}</h1>
      <p className="mb-3">{props.event.description}</p>
      <CountdownTimer targetDate={new Date(props.event.startDate)} />
      {allowJoinEvent() && (
        <button
          className="inline-flex items-center m-4 px-3 py-2 text-sm font-medium text-center text-white bg-yellow-500 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-500 dark:focus:ring-yellow-800"
          onClick={() => handleJoinEvent()}
        >
          Join Event
        </button>
      )}
      <div className="flex flex-row justify-center mt-4">
        {props.event.users.map((attendee, idx) => (
          <UserTile key={idx} user={attendee} />
        ))}
      </div>
    </div>
  );
}

export default EventOverview;
