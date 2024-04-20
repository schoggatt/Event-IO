import { Event, EventSchema } from "../../models/event";
import BaseService from "../base.service";
import { UserEvent } from "../../models/user-event";
import { z } from "zod";

interface IEventService {
  createEvent(event: Event): Promise<Event>;
  updateEvent(event: Event): Promise<Event>;
  getEvents(): Promise<Event[]>;
  addAttendee(userEvent: UserEvent): Promise<Event>;
}

export default class EventService extends BaseService implements IEventService {
  constructor() {
    super("/events");
  }

  createEvent(event: Event): Promise<Event> {
    return this.api.post(`${this.apiSuffix}/`, event).then((res) => {
      return EventSchema.parse(res.data);
    });
  }

  updateEvent(event: Event): Promise<Event> {
    return this.api.put(`${this.apiSuffix}/`, event).then((res) => {
      return EventSchema.parse(res.data);
    });
  }

  getEvents(): Promise<Event[]> {
    return this.api.get(`${this.apiSuffix}/`).then((res) => {
      return z.array(EventSchema).parse(res.data);
    });
  }

  deleteEvent(eventId: number): Promise<Event> {
    return this.api.delete(`${this.apiSuffix}/${eventId}`).then((res) => {
      return EventSchema.parse(res.data);
    });
  }

  addAttendee(userEvent: UserEvent): Promise<Event> {
    return this.api
      .post(`${this.apiSuffix}/add/attendee`, userEvent)
      .then((res) => {
        return EventSchema.parse(res.data);
      });
  }

  removeAttendee(userEventId: number): Promise<Event> {
    return this.api
      .delete(`${this.apiSuffix}/remove/attendee/${userEventId}`)
      .then((res) => {
        return EventSchema.parse(res.data);
      });
  }
}
