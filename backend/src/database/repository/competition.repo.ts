import { CompetitionModel } from "../models/competition.model";

export const createCompetition = (competition): void =>
  CompetitionModel.findOneAndUpdate({}, competition, {
    upsert: true,
    setDefaultsOnInsert: true,
  });
