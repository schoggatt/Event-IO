import React from "react";
import { IEvent } from "../models/event";
import CountdownTimer from "./countdown-timer";
import UserTile from "./user-tile";

// Probably should only show a max of like 10 RSVP'd users
function EventOverview(props: { event: IEvent }) {
  return (
    <div className="justify-center text-center">
      <h1 className="text-5xl mb-3">{props.event.name}</h1>
      <p className="mb-3">{props.event.description}</p>
      <CountdownTimer targetDate={props.event.date} />
      <button
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        onClick={() => console.log("something should happen here...")}
      >
        Join Event
      </button>
      <div className="flex flex-row justify-center mt-4">
        {props.event.attendees.map((attendee) => (
          <UserTile key={attendee.key} user={attendee} />
        ))}
      </div>
    </div>
  );
}

export default EventOverview;
