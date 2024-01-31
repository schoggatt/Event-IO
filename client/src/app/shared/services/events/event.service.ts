import axios from "axios";
import { Event } from "../../models/event";
import BaseService from "../base.service";

interface IEventService {
  getEvents(): Promise<Event[]>;
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
}
