import type { IRelayTeams } from "../../backend/src/database/interfaces";
import { Paths } from "../../global/constants/api";
import { getRequest } from "../utils/api.utils";

export const getRelayTeams = async (): Promise<IRelayTeams> => {
  const response = await getRequest(`${Paths.RELAY_TEAMS}`, {});
  return response.data as IRelayTeams;
};

export const getRelayTeamsForEvent = async (
  eventId: string
): Promise<IRelayTeams> => {
  const response = await getRequest(`${Paths.RELAY_TEAMS}/${eventId}`, {
    eventId: eventId,
  });
  return response.data as IRelayTeams;
};
