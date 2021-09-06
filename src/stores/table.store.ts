import { writable } from "svelte/store";
import type { ISelectedRow } from "../../global/interfaces";

export const currentEventId = writable("");

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

const participants: ISelectedRow = { id: "", data: null };
export const selectedParticipant = writable(participants);

currentEventId.subscribe(() => selectedParticipant.set(participants));
