import { writable } from "svelte/store";

export const currentEventId = writable("");

const columns = localStorage.getItem("columns");
export const visibleColumns = writable(columns ? JSON.parse(columns) : {});
visibleColumns.subscribe((value) =>
  localStorage.setItem("columns", JSON.stringify(value))
);

export const selectedParticipant = writable({});

currentEventId.subscribe((_) => selectedParticipant.set({}));
