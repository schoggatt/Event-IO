import axios from "axios";
import { Event } from "../../models/event";
import BaseService from "../base.service";
import { UserEvent } from "../../models/user-event";

interface IEventService {
  getEvents(): Promise<Event[]>;
  addAttendee(userEvent: UserEvent): Promise<Event>;
}

export default class EventService extends BaseService implements IEventService {
  constructor() {
    super("events");
  }

  getEvents(): Promise<Event[]> {
    return axios
      .get(`${this.apiEndpoint}/`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addAttendee(userEvent: UserEvent): Promise<Event> {
    return axios
      .post(`${this.apiEndpoint}/add/attendee`, userEvent)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  removeAttendee(userEventId: number): Promise<Event> {
    return axios
      .delete(`${this.apiEndpoint}/add/attendee/${userEventId}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
