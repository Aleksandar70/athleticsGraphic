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

export const getRelayTeamsForEvent = async (
  eventId: string
): Promise<IRelayTeams[]> => {
  return await RelayTeamModel.find({ eventId: eventId });
};

//NOT USED AT THE MOMENT.
export const updateRelayTeams = async (
  relayTeams: IRelayTeams[]
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
