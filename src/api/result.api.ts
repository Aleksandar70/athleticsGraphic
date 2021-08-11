import type {
  IResultParams,
  ITableData,
} from "../../backend/src/api/interfaces/interfaces";
import { getRequest, putRequest } from "../utils/api.utils";

export const getResults = async (
  params: IResultParams
): Promise<Record<string, unknown>[]> => {
  const rawResults = await getRequest(params, "result");
  return rawResults.data;
};

export const updateTable = async (
  params: ITableData
): Promise<Record<string, unknown>[]> => {
  const rawResults = await putRequest(params, "resultUpdate");
  return rawResults.data;
};
