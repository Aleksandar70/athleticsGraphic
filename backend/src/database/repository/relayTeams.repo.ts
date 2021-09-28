import { IRelayTeam } from "../../../../global/interfaces";
import { IRelayTeams } from "../interfaces";
import { RelayTeamModel } from "../models/relayTeams.model";

export const createRelayTeams = async (
  relayTeams: IRelayTeams[]
): Promise<IRelayTeams[]> => {
  const relayTeamModels: IRelayTeams[] = [];

  for (const relayTeam of relayTeams) {
    const relayTeamModel = new RelayTeamModel({
      ...relayTeam,
    });

    relayTeamModels.push(relayTeamModel);
  }

  return await RelayTeamModel.insertMany(relayTeamModels);
};

export const getRelayTeams = async (): Promise<IRelayTeams[]> => {
  return await RelayTeamModel.find();
};

export const getRelayTeamsForEvent = async (
  eventId: string
): Promise<IRelayTeams[]> => {
  return await RelayTeamModel.find({ eventId: eventId });
};

export const updateRelayTeams = async (
  relayTeams: IRelayTeam[]
): Promise<boolean> => {
  let result = true;
  for (const relayTeam of relayTeams) {
    const status = await RelayTeamModel.updateOne(
      { relayTeamId: relayTeam.relayTeamId },
      relayTeam,
      {
        omitUndefined: true,
      }
    );

    result = result && status.ok === 1;
  }

  return result;
};
