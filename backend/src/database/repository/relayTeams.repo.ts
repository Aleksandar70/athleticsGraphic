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
