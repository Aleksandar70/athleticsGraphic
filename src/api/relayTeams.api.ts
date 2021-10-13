import type { IRelayTeam } from "../../backend/src/database/interfaces";
import { Paths } from "../../global/constants/api";
import { getRequest } from "../utils/api.utils";

export const getRelayTeamsForEvent = async (
  eventId: string
): Promise<IRelayTeam[]> => {
  const response = await getRequest(`${Paths.RELAY_TEAMS}/${eventId}`, {
    eventId: eventId,
  });
  return response.data as IRelayTeam[];
};
