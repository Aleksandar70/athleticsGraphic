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
  tableData: RawData,
  eventId: string
): Promise<boolean> => {
  const trialNumbers = getTrialData(tableData);
  let trialsUpdated = true;

  if (trialNumbers?.length) {
    trialsUpdated = (await putRequest(
      Paths.TRIALS,
      trialNumbers
    )) as unknown as boolean;
  }

  const result = getResultData(tableData, eventId);
  let resultsUpdated = true;

  if (result?.length) {
    resultsUpdated = (await putRequest(
      Paths.RESULTS,
      result
    )) as unknown as boolean;
  }

  return (
    trialsUpdated &&
    resultsUpdated &&
    ((await putRequest(Paths.COMPETITOR, tableData)) as unknown as boolean)
  );
};

const getTrialData = (tableData: RawData): Record<string, string>[] => {
  return tableData
    .map((data) => {
      const trialData = {};
      const numbers = Object.keys(data).filter((key) => isNumeric(key));
      trialData["competitorId"] = data.competitorId;
      numbers.forEach((number) => {
        trialData[number] = data[number];
        delete trialData[number];
      });
      return trialData;
    })
    .filter((data) => Object.keys(data)?.length > 1);
};

const getResultData = (
  tableData: RawData,
  eventId: string
): Record<string, string>[] => {
  return tableData
    .map((data) => {
      const resultData: Record<string, string> = {};
      resultData["competitorId"] = data.competitorId as string;
      resultData["result"] = data.result as string;
      resultData["eventId"] = eventId;
      delete resultData["results"];
      return resultData;
    })
    .filter((data) => data.result);
};
