import { Event } from "@/lib/types";

export const getEventNames = (events: Event[]) => {
  const eventNames =
    events.length === 0
      ? ""
      : events.length === 1
      ? events[0].name
      : events.length === 2
      ? events.map((e) => e.name).join(" & ")
      : `${events
          ?.slice(0, -1)
          .map((e) => e.name)
          .join(", ")} & ${events[events.length - 1]?.name}`;
  return eventNames;
};
