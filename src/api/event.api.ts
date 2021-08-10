import { getRequest } from "../utils/api.utils";

export const getEventData = async (): Promise<Record<string, unknown>[]> => {
  const response = await getRequest("event");
  return response.data;
};
