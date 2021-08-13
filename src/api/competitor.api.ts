import { Paths } from "../../global/constants/api";
import { putRequest } from "../utils/api.utils";

export const updateCompetitors = async (
  competitors: Record<string, unknown>[]
): Promise<Record<string, unknown>[]> => {
  const updatedCompetitors = await putRequest(Paths.COMPETITOR, competitors);
  return updatedCompetitors.data as Record<string, unknown>[];
};
