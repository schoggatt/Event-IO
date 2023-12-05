import { PrismaClient } from "@prisma/client";
import { Event } from "../models/event";

class EventRepository {
  public prisma = new PrismaClient();

  create(event: Event) {
    const newUser = this.prisma.events.create({ data: event });
    return newUser;
  }

  retrieveAll() {
    const events = this.prisma.events.findMany();
    return events;
  }

  retrieveByKey(eventKey: number) {
    const event = this.prisma.events.findUnique({ where: { id: eventKey } });
    return event;
  }

  update(event: Event) {
    this.prisma.events.update({
      where: { id: event.id },
      data: {
        name: event.name,
        description: event.description,
        location: event.location,
        startDate: event.startDate,
        endDate: event.endDate,
        createdAt: event.createdAt,
        updatedAt: event.updatedAt,
      },
    });

    return event;
  }

  delete(eventKey: number) {
    const event = this.prisma.events.delete({ where: { id: eventKey } });
    return event;
  }
}

export default new EventRepository();
