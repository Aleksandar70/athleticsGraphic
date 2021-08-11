import type { ITableData } from "../../backend/src/api/interfaces/interfaces";
import { putRequest } from "../utils/api.utils";

export const updateCompetitors = async (
  competitors: ITableData
): Promise<Record<string, unknown>[]> => {
  const updatedCompetitors = await putRequest(competitors, "resultUpdate");
  return updatedCompetitors.data;
};
