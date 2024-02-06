import { PrismaClient } from "@prisma/client";
import { IEvent } from "../models/event";
import { ConvertToEventModel as convertToEventModel } from "../models/extensions/event.extension";
import { IUserEvent } from "../models/user-event";

class EventRepository {
  public prisma = new PrismaClient();

  async create(event: IEvent) {
    const newEvent = await this.prisma.events.create({
      data: event,
      include: {
        userEvents: {
          select: {
            user: true,
          },
        },
      },
    });
    return convertToEventModel(newEvent);
  }

  async retrieveAll() {
    const events = await this.prisma.events.findMany({
      include: {
        userEvents: {
          select: {
            user: true,
          },
        },
      },
    });
    return events.map((event) => convertToEventModel(event));
  }

  async retrieveByKey(eventId: number) {
    const event = await this.prisma.events.findUnique({
      where: { id: eventId },
      include: {
        userEvents: {
          select: {
            user: true,
          },
        },
      },
    });
    return convertToEventModel(event);
  }

  update(event: IEvent) {
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

  delete(eventId: number) {
    const event = this.prisma.events.delete({ where: { id: eventId } });
    return event;
  }

  async addAttendee(userEvent: IUserEvent) {
    const newUserEvent = await this.prisma.userEvents.create({
      data: {
        userId: userEvent.userId,
        eventId: userEvent.eventId,
      },
    });
    return newUserEvent;
  }

  async removeAttendee(userEventId: number) {
    const deletedUserEvent = await this.prisma.userEvents.delete({
      where: { id: userEventId },
    });
    return deletedUserEvent;
  }
}

export default new EventRepository();
