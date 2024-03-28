import { EventModel, IEvent } from "../event";

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
    userEvents: event.userEvents ?? [],
    owner: event.owner,
  };
  return new EventModel(mappedEvent);
}
