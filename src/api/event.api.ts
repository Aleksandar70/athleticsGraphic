import { Paths } from "../../global/constants/api";
import type { IEvent } from "../../global/interfaces";
import type { RawData } from "../../global/types";
import { getRequest, putRequest } from "../utils/api.utils";

export const getEventsData = async (): Promise<RawData> => {
  const response = await getRequest(`${Paths.EVENTS}`);
  return response.data as RawData;
};

export const getEventData = async (eventId: string): Promise<IEvent> => {
  const response = await getRequest(`${Paths.EVENTS}/${eventId}`);
  return response.data?.[0];
};

export const updateEvents = async (tableData: RawData): Promise<boolean> => {
  return (await putRequest(Paths.EVENTS, tableData)) as unknown as boolean;
};
