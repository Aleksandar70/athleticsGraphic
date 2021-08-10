import type { IResultParams } from "../../global/interfaces";
import { getRequest } from "../utils/api.utils";

export const getResults = async (
  params: IResultParams
): Promise<Record<string, unknown>[]> => {
  const rawResults = await getRequest("result", params);
  return rawResults.data;
};
