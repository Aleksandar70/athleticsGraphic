import { Paths } from "../../global/constants/api";
import type { RawData } from "../../global/types";
import { putRequest } from "../utils/api.utils";

export const updateCompetitors = async (
  tableData: RawData
): Promise<boolean> => {
  return (await putRequest(Paths.COMPETITOR, tableData)) as unknown as boolean;
};
