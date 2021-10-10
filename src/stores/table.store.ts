import { writable } from "svelte/store";

export const currentEventId = writable("");

export const currentColumn = writable(0);
export const currentRow = writable(0);

export const currentEventData = writable({});
export const currentCompetitionData = writable({});
export const isRelayTeamEvent = writable(false);
export const currentHeatName = writable("single");

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
export const heatTableParticipants = writable([]);

export const competitors = writable([]);

currentEventId.subscribe(() => {
  selectedParticipant.set([]);
  currentColumn.set(0);
  currentRow.set(0);
  isRelayTeamEvent.set(false);
  heatTableParticipants.set([]);
  currentHeatName.set("single");
});
