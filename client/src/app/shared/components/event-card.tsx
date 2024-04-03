import Link from "next/link";
import React from "react";
import { Event } from "../models/event";
import { Button, Card } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { useRouter } from "next/navigation";

export interface ICardProps {
  event: Event;
  descriptionMaxLength: number;
}

export default function EventCard(props: ICardProps) {
  const router = useRouter();

  return (
    <Card className="h-[22em]">
      <Link href={`events/${props.event.id}`}>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {props.event.name}
        </h5>
      </Link>
      <h6 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
        {new Date(props.event.startDate).toLocaleDateString()}
      </h6>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {props.event.description.length > props.descriptionMaxLength
          ? props.event.description.slice(0, 200).trimEnd() + "..."
          : props.event.description}
      </p>
      <Button onClick={() => router.push(`/events/${props.event.id}`)}>
        Read more
        <HiOutlineArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </Card>
  );
}
