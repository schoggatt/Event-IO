import React from "react";
import { Event } from "../models/event";
import CountdownTimer from "./countdown-timer";
import UserTile from "./user-tile";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { UserEvent } from "../models/user-event";
import { useDispatch } from "react-redux";
import { addAttendee, removeAttendee } from "@/redux/features/event.slice";
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

  function handleLeaveEvent() {
    if (user) {
      const userEvent = props.event.userEvents.find(
        (userEvent) => userEvent.userId === user.id!
      )?.id;
      if (userEvent) {
        dispatch(removeAttendee(userEvent));
      } else {
        // TODO: Need to research better logging practices
        console.error("User is not attending event");
      }
    }
  }

  // TODO: Maybe there is a better way to do this
  function getButtonState() {
    if (user) {
      if (
        props.event.userEvents.filter(
          (userEvent) => userEvent.userId === user.id
        ).length === 0
      ) {
        return (
          <button
            className="inline-flex items-center m-4 px-3 py-2 text-sm font-medium text-center text-white bg-yellow-500 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-500 dark:focus:ring-yellow-800"
            onClick={() => handleJoinEvent()}
          >
            Join Event
          </button>
        );
      } else {
        return (
          <button
            className="inline-flex items-center m-4 px-3 py-2 text-sm font-medium text-center text-white bg-yellow-500 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-500 dark:focus:ring-yellow-800"
            onClick={() => handleLeaveEvent()}
          >
            Leave Event
          </button>
        );
      }
    }
  }

  return (
    <div className="justify-center text-center w-1/2">
      <h1 className="text-4xl mb-3">{props.event.name}</h1>
      <p className="mb-3">{props.event.description}</p>
      <CountdownTimer targetDate={new Date(props.event.startDate)} />
      {getButtonState()}
      <div className="flex flex-row justify-center mt-4">
        {props.event.userEvents.map((userEvent, idx) => (
          <UserTile key={idx} user={userEvent.user!} />
        ))}
      </div>
    </div>
  );
}

export default EventOverview;
