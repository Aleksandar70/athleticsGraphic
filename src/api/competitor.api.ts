import { get } from "svelte/store";
import { Paths } from "../../global/constants/api";
import type { ICompetitor } from "../../global/interfaces";
import type { RawData } from "../../global/types";
import { currentEventId, currentHeatName } from "../stores/table.store";
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
  const result = getResultData(tableData);
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
        delete data[number];
      });
      return trialData;
    })
    .filter((data) => Object.keys(data)?.length > 1);
};

const getResultData = (tableData: RawData): Record<string, string>[] => {
  return tableData
    .map((data) => {
      const resultData: Record<string, string> = {};
      resultData["competitorId"] = data.competitorId as string;
      resultData["teamId"] = data.teamId as string;
      resultData["result"] = data.result as string;
      resultData["place"] = data.place as string;
      resultData["eventId"] = get(currentEventId);
      resultData["heatName"] = get(currentHeatName);
      delete data.result;
      return resultData;
    })
    .filter((data) => data.result != undefined || data.place != undefined);
};
