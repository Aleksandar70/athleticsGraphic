import { Paths } from "../../global/constants/api";
import { getRequest } from "../utils/api.utils";

export const getEventData = async (): Promise<Record<string, unknown>[]> => {
  const response = await getRequest(`${Paths.EVENTS}`);
  return response.data as Record<string, unknown>[];
};

export const getEventCompetitors = async (
  eventId: string
): Promise<Record<string, unknown>[]> => {
  const response = await getRequest(`${Paths.EVENTS}/${eventId}`);
  return response.data as Record<string, unknown>[];
};
