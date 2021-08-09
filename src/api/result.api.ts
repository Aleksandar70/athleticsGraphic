import type { IResultParams } from "../../backend/src/api/interfaces/interfaces";
import { getRequest } from "../utils/api.utils";

export const getResults = async (
  params: IResultParams
): Promise<Record<string, unknown>[]> => {
  const rawResults = await getRequest(params, "result");
  return rawResults.data;
};
