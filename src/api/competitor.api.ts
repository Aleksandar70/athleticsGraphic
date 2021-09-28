import { get } from "svelte/store";
import { Paths } from "../../global/constants/api";
import type { ICompetitor } from "../../global/interfaces";
import type { RawData } from "../../global/types";
import { currentEventId } from "../stores/table.store";
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
  const trialNumbers = getTrialData(tableData);
  let trialsUpdated = true;

  if (trialNumbers?.length) {
    trialsUpdated = (await putRequest(
      Paths.TRIALS,
      trialNumbers
    )) as unknown as boolean;
  }
  console.log("tableData2: ", tableData);
  const result = getResultData(tableData, get(currentEventId));
  let resultsUpdated = true;
  if (result?.length) {
    resultsUpdated = (await putRequest(
      Paths.RESULTS,
      result
    )) as unknown as boolean;
  }
  console.log("tableData ", tableData);
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
        delete data[number];
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
      console.log("data ", data);
      resultData["competitorId"] = data.competitorId as string;
      resultData["teamId"] = data.teamId as string;
      resultData["result"] = data.result as string;
      resultData["eventId"] = eventId;
      resultData["runners"] = data.runners as string;
      delete data.result;
      return resultData;
    })
    .filter((data) => data.result);
};
