import { Request, Response } from "express";
import eventRepository from "../repositories/event.repository";
import { IEvent } from "../models/event";

export default class EventController {
  async create(req: Request, res: Response) {
    const event: IEvent = req.body;
    try {
      const newEvent = await eventRepository.create(event);
      if (newEvent) {
        res.status(200).json(newEvent);
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
    const event: IEvent = req.body;
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
    const eventId: number = parseInt(req.params.eventId);
    try {
      const event = await eventRepository.retrieveByKey(eventId);
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
    const eventId: number = parseInt(req.params.eventId);
    try {
      const deletedEvent = await eventRepository.delete(eventId);
      if (deletedEvent) {
        res.status(200).json(deletedEvent);
      } else {
        res.status(404).json({ message: "Event not found" });
      }
    } catch (err: any) {
      res
        .status(500)
        .json({ message: "Some error occurred while deleting the event." });
    }
  }

  async addAttendee(req: Request, res: Response) {
    const userEvent = req.body;
    try {
      const newAttendee = await eventRepository.addAttendee(userEvent);
      const updatedEvent = await eventRepository.retrieveByKey(
        userEvent.eventId
      );
      if (newAttendee) {
        res.status(200).json(updatedEvent);
      } else {
        res
          .status(500)
          .json({ message: "Some error occurred while adding attendee." });
      }
    } catch (err: any) {
      res
        .status(500)
        .json({ message: "Some error occurred while adding attendee." });
    }
  }

  async removeAttendee(req: Request, res: Response) {
    const userEventId = parseInt(req.params.userEventId);
    try {
      const deleteAttendee = await eventRepository.removeAttendee(userEventId);
      const updatedEvent = await eventRepository.retrieveByKey(
        deleteAttendee.eventId
      );
      if (deleteAttendee) {
        res.status(200).json(updatedEvent);
      } else {
        res
          .status(500)
          .json({ message: "Some error occurred while adding attendee." });
      }
    } catch (err: any) {
      res
        .status(500)
        .json({ message: "Some error occurred while adding attendee." });
    }
  }
}
