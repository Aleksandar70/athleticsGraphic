import { Paths } from "../../global/constants/api";
import { getRequest } from "../utils/api.utils";

export const getEventData = async (): Promise<Record<string, unknown>[]> => {
  const response = await getRequest(Paths.EVENTS);
  return response.data;
};
