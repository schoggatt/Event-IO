"use client";

import EventOverview from "@/app/shared/components/event-overview";
import { Event } from "@/app/shared/models/event";
import { mockEvents } from "@/app/tests/mocks/events.mocks";
import React, { useEffect } from "react";

export default function Event({ params }: { params: { eventId: string } }) {
  const [event, setEvent] = React.useState<Event | undefined>(undefined);

  useEffect(() => {
    const mockEvent = mockEvents.find(
      (event) => event.id === Number(params.eventId)
    );
    setEvent(mockEvent);
  }, [params.eventId]);

  return (
    <div className="flex justify-center text-center align-center">
      {event && <EventOverview event={event} />}
    </div>
  );
}
