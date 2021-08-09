import { Constants } from "../../../../constants/constants";
import { CompetitionModel } from "../models/competition.model";

export const createCompetition = async (competition) => {
  const competitions = await CompetitionModel.find({
    id: competition.id,
  }).exec();
  if (competitions.length !== 0) {
    return competitions[0];
  }

  const country = competition.country ?? Constants.EMPTY_STRING;
  const date = competition.date ?? Constants.EMPTY_STRING;
  const finishDate = competition.finishDate ?? Constants.EMPTY_STRING;
  const fullName = competition.fullName ?? Constants.EMPTY_STRING;
  const id = competition.id ?? Constants.EMPTY_STRING;
  const year = competition.year ?? Constants.DEFAULT_COMPETITION_YEAR;

  const newCompetition = CompetitionModel.create({
    country,
    date,
    finishDate,
    fullName,
    id,
    year,
  });
  return newCompetition;
};

export const findCompetitionById = async (competitionId) => {
  const competitions = await CompetitionModel.find({
    _id: competitionId,
  }).exec();
  if (competitions.length !== 0) {
    return competitions[0];
  }
  return null;
};
