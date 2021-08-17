import { ICompetition } from "../interfaces";
import { CompetitionModel } from "../models/competition.model";

export const createCompetition = async (
  competition: ICompetition
): Promise<ICompetition> =>
  await CompetitionModel.findOneAndUpdate({}, competition, {
    upsert: true,
    setDefaultsOnInsert: true,
  });
