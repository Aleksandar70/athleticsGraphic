import { Constants } from "../../../../global/constants/constants";
import { CompetitorModel } from "../models/competitor.model";

export const createCompetitor = async (competition_id, competitor) => {
  const competitors = await CompetitorModel.find({
    competitionId: competition_id,
    competitorId: competitor.competitorId,
  }).exec();

  if (competitors.length !== 0) {
    return competitors[0];
  }

  const competitionId = competition_id;
  const checkedIn = competitor.checkedIn ?? false;
  const competitorId = competitor.competitorId ?? Constants.EMPTY_STRING;
  const firstName = competitor.firstName ?? Constants.EMPTY_STRING;
  const lastName = competitor.lastName ?? Constants.EMPTY_STRING;
  const sortBib = competitor.sortBib == null ? 0 : parseInt(competitor.sortBib);

  const newCompetitor = CompetitorModel.create({
    competitionId,
    checkedIn,
    competitorId,
    firstName,
    lastName,
    sortBib,
  });
  return newCompetitor;
};

export const findCompetitorByBib = async (bib) => {
  const competitors = await CompetitorModel.find({ sortBib: bib }).exec();
  if (competitors.length !== 0) {
    return competitors[0];
  }
  return null;
};

export const updateCompetitors = async (competitors) => {
  for (const competitor of competitors) {
    const competitorDB = await findCompetitorByBib(competitor.bib);
    if (competitorDB !== null) {
      competitorDB.firstName = competitor.first_name;
      competitorDB.lastName = competitor.last_name;
      competitorDB.dateOfBirth = competitor.date_of_birth;
      competitorDB.gender = competitor.gender;
      competitorDB.pb = competitor.pb;
      competitorDB.teamName = competitor.team_name;
      return await competitorDB.save();
    }
  }
  return null;
};
