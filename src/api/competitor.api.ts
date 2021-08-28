import { Paths } from "../../global/constants/api";
import type { ICompetitor } from "../../global/interfaces";
import type { RawData } from "../../global/types";
import { getRequest, putRequest } from "../utils/api.utils";
import { isNumeric } from "../utils/string.utils";

export const getCompetitorsForEvent = async (
  eventId: string
): Promise<ICompetitor[]> => {
  const competitors = await getRequest(Paths.COMPETITOR, { eventId: eventId });
  return competitors.data as ICompetitor[];
};

export const updateCompetitors = async (
  tableData: RawData
): Promise<boolean> => {
  const trialNumbers = tableData
    .map((data) => {
      const trialData = {};
      const numbers = Object.keys(data).filter((key) => isNumeric(key));
      trialData["competitorId"] = data.competitorId;
      numbers.forEach((number) => (trialData[number] = data[number]));
      return trialData;
    })
    .filter((data) => Object.keys(data)?.length > 1);

  let trialsUpdated = true;

  if (trialNumbers?.length) {
    trialsUpdated = (await putRequest(
      Paths.TRIALS,
      trialNumbers
    )) as unknown as boolean;
  }
  return (
    trialsUpdated &&
    ((await putRequest(Paths.COMPETITOR, tableData)) as unknown as boolean)
  );
};
