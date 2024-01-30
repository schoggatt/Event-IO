"use client";

import EventOverview from "@/app/shared/components/event-overview";
import { IEvent } from "@/app/shared/models/event";
import { mockEvents } from "@/app/tests/mocks/events.mocks";
import React, { useEffect } from "react";

export default function Event({ params }: { params: { eventId: string } }) {
  const [event, setEvent] = React.useState<IEvent | undefined>(undefined);

  useEffect(() => {
    const mockEvent = mockEvents.find(
      (event) => event.key === Number(params.eventId)
    );
    setEvent(mockEvent);
  }, []);

  return (
    <div className="flex justify-center text-center align-center">
      {event && <EventOverview event={event} />}
    </div>
  );
}
