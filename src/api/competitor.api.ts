import { Paths } from "../../global/constants/api";
import type { ICompetitor } from "../../global/interfaces";
import type { RawData } from "../../global/types";
import { getRequest, putRequest } from "../utils/api.utils";
import {
  getResultsToUpdateFromTable,
  getTrialsToUpdateFromTable,
} from "../utils/table.utils";

export const getCompetitorsForEvent = async (
  eventId: string
): Promise<ICompetitor[]> => {
  const competitors = await getRequest(Paths.COMPETITOR, { eventId: eventId });
  return competitors.data as ICompetitor[];
};

export const updateCompetitors = async (
  tableData: RawData
): Promise<boolean> => {
  const trialsUpdated = updateTrials(tableData);
  const resultsUpdated = updateResults(tableData);

  return (
    trialsUpdated &&
    resultsUpdated &&
    ((await putRequest(Paths.COMPETITOR, tableData)) as unknown as boolean)
  );
};

const updateTrials = async (tableData: RawData): Promise<boolean> => {
  const trialNumbers = getTrialsToUpdateFromTable(tableData);
  if (trialNumbers?.length) {
    return (await putRequest(Paths.TRIALS, trialNumbers)) as unknown as boolean;
  }
  return true;
};

const updateResults = async (tableData: RawData): Promise<boolean> => {
  const result = getResultsToUpdateFromTable(tableData);
  if (result?.length) {
    return (await putRequest(Paths.RESULTS, result)) as unknown as boolean;
  }
  return true;
};
