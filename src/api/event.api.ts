import { Paths } from "../../global/constants/api";
import type { IResultParams } from "../../global/interfaces";
import { getRequest } from "../utils/api.utils";

export const getEventData = async (
  params?: IResultParams
): Promise<Record<string, unknown>[]> => {
  const response = await getRequest(Paths.EVENTS, params);
  return response.data;
};
