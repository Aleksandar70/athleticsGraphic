import type {
  ICompetitor,
  IRelayTeams,
} from "../../backend/src/database/interfaces";
import { Paths } from "../../global/constants/api";
import type { RawData } from "../../global/types";
import { getRequest, putRequest } from "../utils/api.utils";

export const getRelayTeams = async (): Promise<IRelayTeams> => {
  const response = await getRequest(`${Paths.RELAY_TEAMS}`, {});
  return response.data as IRelayTeams;
};

export const getRelayTeamsForEvent = async (
  eventId: string
): Promise<IRelayTeams[]> => {
  const response = await getRequest(`${Paths.RELAY_TEAMS}/${eventId}`, {
    eventId: eventId,
  });
  return response.data as IRelayTeams[];
};

export const updateRelayTeams = async (
  tableData: RawData,
  eventId: string
): Promise<boolean> => {
  console.log("TableData: ", tableData);
  const result = getResultData(tableData, eventId);
  let resultsUpdated = true;

  if (result?.length) {
    resultsUpdated = (await putRequest(
      Paths.RESULTS,
      result
    )) as unknown as boolean;
  }
  return (
    resultsUpdated &&
    ((await putRequest(Paths.RELAY_TEAMS, tableData)) as unknown as boolean)
  );
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
      delete data.result;
      return resultData;
    })
    .filter((data) => data.result);
};
