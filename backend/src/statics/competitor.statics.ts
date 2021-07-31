import { CompetitorModel } from "../models/competitor.model";

export async function createCompetitor(competition_id, competitor) {
    const competitors = await CompetitorModel.find({ competitionId: competition_id, competitorId: competitor.competitorId }).exec();
    if (competitors.length !== 0) {
        return competitors[0];
    }
    const EMPTY_STRING = "";
    const competitionId = competition_id;
    const checkedIn = competitor.checkedIn ?? false;
    const competitorId = competitor.competitorId ?? EMPTY_STRING;
    const firstName = competitor.firstName ?? EMPTY_STRING;
    const lastName = competitor.lastName ?? EMPTY_STRING;
    const sortBib = competitor.sortBib == null ? 0 : parseInt(competitor.sortBib);

    const newCompetitor = CompetitorModel.create({
        competitionId,
        checkedIn,
        competitorId,
        firstName,
        lastName,
        sortBib
    });
    return newCompetitor;
}

export async function findCompetitorByBib(bib) {
    const competitors = await CompetitorModel.find({ sortBib: bib }).exec();
    if (competitors.length !== 0) {
        return competitors[0];
    }
    return null;
}
