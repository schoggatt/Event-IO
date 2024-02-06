import { EventModel, IEvent } from "../event";
import { IUser } from "../user";

export function ConvertToEventModel(event: any) {
  const mappedEvent: IEvent = {
    id: event.id,
    name: event.name,
    description: event.description,
    location: event.location,
    startDate: event.startDate,
    endDate: event.endDate,
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
    users: event.userEvents.map((userEvent: { user: IUser }) => userEvent.user),
  };
  return new EventModel(mappedEvent);
}
