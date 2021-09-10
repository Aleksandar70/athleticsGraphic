import { writable } from "svelte/store";

export const currentEventId = writable("");

export const currentEventData = writable({});

const columns = localStorage.getItem("columns");
export const visibleColumns = writable(columns ? JSON.parse(columns) : {});
visibleColumns.subscribe((value) =>
  localStorage.setItem("columns", JSON.stringify(value))
);

const locked = localStorage.getItem("locked");
export const lockedColumns = writable(locked ? JSON.parse(locked) : {});
lockedColumns.subscribe((value) =>
  localStorage.setItem("locked", JSON.stringify(value))
);

export const selectedParticipant = writable([]);

currentEventId.subscribe(() => selectedParticipant.set([]));
