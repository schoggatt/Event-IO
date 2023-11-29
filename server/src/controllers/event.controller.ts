import { Request, Response } from "express";
import eventRepository from "../repositories/event.repository";
import { Event } from "../models/event";

export default class EventController {
  async create(req: Request, res: Response) {
    const event: Event = req.body;
    try {
      const newEvent = await eventRepository.create(event);
      if (newEvent) {
        res.status(200).json(event);
      } else {
        res
          .status(500)
          .json({ message: "Some error occurred while creating event." });
      }
    } catch (err: any) {
      res
        .status(500)
        .json({ message: "Some error occurred while retrieving events." });
    }
  }

  async update(req: Request, res: Response) {
    const event: Event = req.body;
    try {
      const updatedEvent = await eventRepository.update(event);
      if (updatedEvent) {
        res.status(200).json(updatedEvent);
      } else {
        res.status(404).json({ message: "Event not found" });
      }
    } catch (err: any) {
      res
        .status(500)
        .json({ message: "Some error occurred while retrieving events." });
    }
  }

  async retrieveById(req: Request, res: Response) {
    const eventKey: number = parseInt(req.params.eventKey);
    try {
      const event = await eventRepository.retrieveByKey(eventKey);
      if (event) {
        res.status(200).json(event);
      } else {
        res.status(404).json({ message: "Event not found" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Some error occurred while retrieving event." });
    }
  }

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

  async delete(req: Request, res: Response) {
    const eventKey: number = parseInt(req.params.eventKey);
    try {
      const deletedEvent = await eventRepository.delete(eventKey);
      if (deletedEvent > 0) {
        res
          .status(200)
          .json({ message: "Event deleted successfully", deletedEvent });
      } else {
        res.status(404).json({ message: "Event not found" });
      }
    } catch (err: any) {
      res
        .status(500)
        .json({ message: "Some error occurred while retrieving events." });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const deletedEvents = await eventRepository.deleteAll();
      res
        .status(200)
        .json({ message: "Events deleted successfully", deletedEvents });
    } catch (err: any) {
      res
        .status(500)
        .json({ message: "Some error occurred while retrieving events." });
    }
  }
}
