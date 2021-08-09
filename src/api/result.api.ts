import type { IResultParams } from "../../backend/src/api/interfaces/interfaces";
import { getRequest, postRequest } from "../utils/api.utils";

export const getResults = async (
  params: IResultParams
): Promise<Record<string, unknown>[]> => {
  const rawResults = await getRequest(params, "result");
  return rawResults.data;
};

export const updateTable = async (
  params
): Promise<Record<string, unknown>[]> => {
  console.log("params ", params);
  const rawResults = await postRequest(params, "resultUpdate");
  return rawResults.data;
};
