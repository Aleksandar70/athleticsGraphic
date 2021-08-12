import { Paths } from "../../global/constants/api";
import type { ITableData } from "../../global/interfaces";
import { putRequest } from "../utils/api.utils";

export const updateCompetitors = async (
  competitors: ITableData[]
): Promise<Record<string, unknown>[]> => {
  const updatedCompetitors = await putRequest(Paths.COMPETITOR, competitors);
  return updatedCompetitors.data;
};
