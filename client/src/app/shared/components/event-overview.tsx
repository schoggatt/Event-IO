import React from "react";
import { Event } from "../models/event";
import CountdownTimer from "./countdown-timer";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { UserEvent } from "../models/user-event";
import { useDispatch } from "react-redux";
import { addAttendee, removeAttendee } from "@/redux/features/event.slice";
import { userState } from "@/redux/features/auth.slice";
import { Button } from "flowbite-react";
import UpdateEventModal from "./update-event-modal";
import { UserTiles } from "./user-tiles";

interface IEventOverviewProps {
  event: Event;
}
// Probably should only show a max of like 10 RSVP'd users
function EventOverview(props: IEventOverviewProps) {
  const [isUpdateModalVisible, setIsUpdateModalVisible] = React.useState(false);

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

  function getButtonState() {
    if (user) {
      if (
        props.event.userEvents.filter(
          (userEvent) => userEvent.userId === user.id
        ).length === 0
      ) {
        return (
          <Button className="w-[8em]" onClick={() => handleJoinEvent()}>
            Join Event
          </Button>
        );
      } else {
        return (
          <Button className="w-[8em]" onClick={() => handleLeaveEvent()}>
            Leave Event
          </Button>
        );
      }
    }
  }

  function toggleVisible() {
    setIsUpdateModalVisible(!isUpdateModalVisible);
  }

  return (
    <div className="justify-center text-center w-1/2">
      <h1 className="text-4xl mb-3">{props.event.name}</h1>
      <h3 className="text-2xl mb-3">{`${props.event.owner.firstName} ${props.event.owner.lastName}`}</h3>
      <p className="mb-3">{props.event.location}</p>
      <p className="mb-3">{props.event.description}</p>
      <CountdownTimer targetDate={new Date(props.event.startDate)} />
      <div className="flex flex-row justify-center mt-4 mb-4">
        <UserTiles
          users={props.event.userEvents.map((userEvent) => userEvent.user!)}
        />
      </div>
      <div className="flex justify-center">
        <div>{getButtonState()}</div>
        {props.event.owner.id === user?.id && (
          <div className="ml-2">
            <Button className="w-[8em]" onClick={toggleVisible}>
              Edit Event
            </Button>
          </div>
        )}
      </div>
      <UpdateEventModal
        event={props.event}
        isVisible={isUpdateModalVisible}
        toggleVisible={toggleVisible}
      />
    </div>
  );
}

export default EventOverview;
