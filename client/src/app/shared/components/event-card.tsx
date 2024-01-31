import Link from "next/link";
import React from "react";
import { Event } from "../models/event";

export interface ICardProps {
  event: Event;
  descriptionMaxLength: number;
}

export default function EventCard(props: ICardProps) {
  return (
    <div className="max-w p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
      <Link
        href={`events/${props.event.id}`}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-500 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-500 dark:focus:ring-yellow-800"
      >
        Read more
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </Link>
    </div>
  );
}
