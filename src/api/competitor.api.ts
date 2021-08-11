import type { ITableData } from "../../backend/src/api/interfaces/interfaces";
import { putRequest } from "../utils/api.utils";

export const updateCompetitors = async (
  params: ITableData
): Promise<Record<string, unknown>[]> => {
  const rawResults = await putRequest(params, "resultUpdate");
  return rawResults.data;
};
