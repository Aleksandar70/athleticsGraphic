import { CompetitionModel } from "../models/competition.model";

export const createCompetition = async (competition): Promise<void> =>
  await CompetitionModel.findOneAndUpdate({}, competition, {
    upsert: true,
    setDefaultsOnInsert: true,
  });
