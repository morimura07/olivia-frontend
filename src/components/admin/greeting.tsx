"use client";

import { useSyncExternalStore } from "react";

function partOfDay(h: number) {
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

const noop = () => () => {};

export function Greeting({ name }: { name: string }) {
  // Server render uses the spec's wording; the client reads the local time of day.
  const hello = useSyncExternalStore(
    noop,
    () => partOfDay(new Date().getHours()),
    () => "Good afternoon",
  );
  return (
    <h1 className="font-serif text-22 font-bold">
      {hello}, {name}
    </h1>
  );
}
