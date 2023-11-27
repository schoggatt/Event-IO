"use client";
import { useEffect, useState } from "react";
import { cn } from "./utils/tailwind-utils";
import EventOverview from "./components/event-overview";
import { IEvent } from "./models/event";

export default function Home() {
  const [colorIndex, setColorIndex] = useState(0);

  const mockEvent: IEvent = {
    name: "Some Event",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed elementum tempus egestas sed sed risus pretium quam. Risus sed vulputate odio ut enim. Convallis convallis tellus id interdum velit laoreet id donec. Facilisis mauris sit amet massa vitae tortor condimentum lacinia quis. Adipiscing commodo elit at imperdiet dui accumsan sit amet nulla. Duis convallis convallis tellus id interdum velit laoreet. Interdum consectetur libero id faucibus. Rhoncus est pellentesque elit ullamcorper dignissim. Duis convallis convallis tellus id. Egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Molestie nunc non blandit massa enim nec. Nisi scelerisque eu ultrices vitae auctor eu augue ut. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt. Duis at tellus at urna condimentum mattis pellentesque id. Felis imperdiet proin fermentum leo vel orci porta. Sociis natoque penatibus et magnis dis parturient. Cras tincidunt lobortis feugiat vivamus at. Et malesuada fames ac turpis egestas.",
    date: new Date("2023-12-25T00:00:00.000Z"),
    key: 0,
    id: "",
    location: "",
    image: "",
    url: "",
    tags: [],
    attendees: [
      {
        key: 0,
        id: "",
        name: "John Doe",
        email: "John.Doe@gmail.com",
        image: "https://th.bing.com/th/id/OIG.ey_KYrwhZnirAkSgDhmg",
      },
      {
        key: 1,
        id: "",
        name: "Jareth Doen",
        email: "Jareth.Doen@gmail.com",
        image: "https://th.bing.com/th/id/OIG.gq_uOPPdJc81e_v0XAei",
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((colorIndex) => (colorIndex + 1) % 9);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="text-center">
        <h1 className="text-8xl font-bold mb-3">
          <span
            className={cn("transition-colors duration-500", {
              "text-purple-300": colorIndex === 0,
              "text-sky-300": colorIndex === 1,
              "text-yellow-300": colorIndex === 2,
              "text-teal-300": colorIndex === 3,
              "text-blue-300": colorIndex === 4,
              "text-green-300": colorIndex === 5,
              "text-orange-400": colorIndex === 6,
              "text-red-300": colorIndex === 7,
              "text-neutral-300": colorIndex === 8,
            })}
          >
            Event
          </span>
          <span>.IO</span>
        </h1>
        <EventOverview event={mockEvent} />
      </div>
    </main>
  );
}
