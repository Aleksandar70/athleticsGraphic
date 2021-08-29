import { writable } from "svelte/store";

export const dataSource = writable("");

export const shouldShowAllColumns = writable(false);

export const currentEventId = writable("");

export const columns = localStorage.getItem("columns");

export const visibleColumns = writable(columns ? JSON.parse(columns) : {});

visibleColumns.subscribe((value) => {
  localStorage.setItem("columns", value);
});
