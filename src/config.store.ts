import { writable } from "svelte/store";

export const dataSource = writable("");

export const shouldShowAllColumns = writable(false);

export const shouldShowDefaultColumns = writable(false);

export const columns = localStorage.getItem("columns");

export const visibleColumns = writable(columns ? JSON.parse(columns) : {});

visibleColumns.subscribe((value) => {
    console.log("value: ", value);
  localStorage.setItem("columns", value);
});
