import { Paths } from "../../global/constants/api";
import type { RawData } from "../../global/types";
import { getRequest, putRequest } from "../utils/api.utils";

export const getEventData = async (): Promise<RawData> => {
  const response = await getRequest(`${Paths.EVENTS}`);
  return response.data as RawData;
};

export const getEventCompetitors = async (
  eventId: string
): Promise<RawData> => {
  const response = await getRequest(`${Paths.EVENTS}/${eventId}`);
  return response.data as RawData;
};

export const updateEvents = async (tableData: RawData): Promise<boolean> => {
  return (await putRequest(Paths.EVENTS, tableData)) as unknown as boolean;
};
