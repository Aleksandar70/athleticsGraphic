import { IRelayTeam } from "../interfaces";
import { RelayTeamModel } from "../models/relayTeams.model";

export const createRelayTeams = async (
  relayTeams: IRelayTeam[]
): Promise<IRelayTeam[]> => {
  const relayTeamModels: IRelayTeam[] = [];

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
): Promise<IRelayTeam[]> => {
  return await RelayTeamModel.find({ eventId: eventId });
};

//NOT USED AT THE MOMENT.
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
