"use client";

import React, { useEffect, useState } from "react";
import { cn } from "../utils/tailwind-utils";

export interface IBannerTextProps {
  size?: string;
}

export default function BannerText(props: IBannerTextProps) {
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((colorIndex) => (colorIndex + 1) % 9);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className={`${props.size ?? "text-8xl"} font-bold`}>
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
          "text-pink-300": colorIndex === 8,
        })}
      >
        Event
      </span>
      <span>.IO</span>
    </h1>
  );
}
