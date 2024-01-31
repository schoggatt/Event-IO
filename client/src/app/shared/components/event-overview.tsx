import React from "react";
import { Event } from "../models/event";
import CountdownTimer from "./countdown-timer";
import UserTile from "./user-tile";

// Probably should only show a max of like 10 RSVP'd users
function EventOverview(props: { event: Event }) {
  return (
    <div className="justify-center text-center w-1/2">
      <h1 className="text-4xl mb-3">{props.event.name}</h1>
      <p className="mb-3">{props.event.description}</p>
      <CountdownTimer targetDate={props.event.startDate} />
      <button
        className="inline-flex items-center m-4 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => console.log("something should happen here...")}
      >
        Join Event
      </button>
      {/* <div className="flex flex-row justify-center mt-4">
        {props.event.attendees.map((attendee) => (
          <UserTile key={attendee.key} user={attendee} />
        ))}
      </div> */}
    </div>
  );
}

export default EventOverview;
