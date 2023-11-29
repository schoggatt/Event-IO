import { Request, Response } from "express";
import { IEvent } from "../models/event.interface";
import eventRepository from "../repositories/event.repository";

export default class EventController {
  async retrieveAll(req: Request, res: Response) {
    try {
      const events = await eventRepository.retrieveAll();
      res.status(200).json(events);
    } catch (err: any) {
      res
        .status(500)
        .json({ message: "Some error occurred while retrieving events." });
    }
  }
}
