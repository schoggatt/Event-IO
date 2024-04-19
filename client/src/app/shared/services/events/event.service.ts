import axios from "axios";
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
    super("events");
  }

  createEvent(event: Event): Promise<Event> {
    return axios
      .post(`${this.apiEndpoint}/`, event, this.config)
      .then((res) => {
        return EventSchema.parse(res.data);
      });
  }

  updateEvent(event: Event): Promise<Event> {
    return axios.put(`${this.apiEndpoint}/`, event, this.config).then((res) => {
      return EventSchema.parse(res.data);
    });
  }

  getEvents(): Promise<Event[]> {
    return axios.get(`${this.apiEndpoint}/`, this.config).then((res) => {
      return z.array(EventSchema).parse(res.data);
    });
  }

  deleteEvent(eventId: number): Promise<Event> {
    return axios
      .delete(`${this.apiEndpoint}/${eventId}`, this.config)
      .then((res) => {
        return EventSchema.parse(res.data);
      });
  }

  addAttendee(userEvent: UserEvent): Promise<Event> {
    return axios
      .post(`${this.apiEndpoint}/add/attendee`, userEvent, this.config)
      .then((res) => {
        return EventSchema.parse(res.data);
      });
  }

  removeAttendee(userEventId: number): Promise<Event> {
    return axios
      .delete(`${this.apiEndpoint}/remove/attendee/${userEventId}`, this.config)
      .then((res) => {
        return EventSchema.parse(res.data);
      });
  }
}
