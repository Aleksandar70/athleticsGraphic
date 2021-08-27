import { Paths } from "../../global/constants/api";
import type { ICompetitor } from "../../global/interfaces";
import type { RawData } from "../../global/types";
import { getRequest, putRequest } from "../utils/api.utils";

export const getCompetitorsForEvent = async (
  eventId: string
): Promise<ICompetitor[]> => {
  const competitors = await getRequest(Paths.COMPETITOR, { eventId: eventId });
  return competitors.data as ICompetitor[];
};

export const updateCompetitors = async (
  tableData: RawData
): Promise<boolean> => {
  return (await putRequest(Paths.COMPETITOR, tableData)) as unknown as boolean;
};
