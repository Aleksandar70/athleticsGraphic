import { get } from "svelte/store";
import { Paths } from "../../global/constants/api";
import type { IEvent } from "../../global/interfaces";
import type { RawData } from "../../global/types";
import { lockedColumns } from "../stores/table.store";
import { getRequest, putRequest } from "../utils/api.utils";

export const getEventsData = async (): Promise<RawData> => {
  const response = await getRequest(`${Paths.EVENTS}`, {
    locked: get(lockedColumns)?.["events"] ?? [],
  });
  return response.data as RawData;
};

export const getEventData = async (eventId: string): Promise<IEvent> => {
  const response = await getRequest(`${Paths.EVENTS}/${eventId}`, {
    locked: get(lockedColumns)?.[eventId] ?? [],
  });
  return response.data as IEvent;
};

export const updateEvents = async (tableData: RawData): Promise<boolean> => {
  return (await putRequest(Paths.EVENTS, tableData)) as unknown as boolean;
};
