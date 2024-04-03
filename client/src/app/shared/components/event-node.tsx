import { Button, Timeline } from "flowbite-react";
import { HiArrowNarrowRight, HiCalendar } from "react-icons/hi";
import { Event } from "../models/event";
import { useRouter } from "next/navigation";

export interface IEventNodeProps {
  event: Event;
}

export default function EventNode(props: IEventNodeProps) {
  const router = useRouter();

  return (
    <Timeline.Item>
      <Timeline.Point icon={HiCalendar} />
      <Timeline.Content>
        <Timeline.Time>
          {new Date(props.event.startDate).toDateString()}
        </Timeline.Time>
        <Timeline.Title className="text-white">
          {props.event.name}
        </Timeline.Title>
        <Timeline.Body>{props.event.location}</Timeline.Body>
        <Timeline.Body>{props.event.description}</Timeline.Body>
        <Button onClick={() => router.push(`/events/${props.event.id}`)}>
          Read More
          <HiArrowNarrowRight className="m-2" />
        </Button>
      </Timeline.Content>
    </Timeline.Item>
  );
}
