import { CompetitorModel } from "../src/models/competitor.model";
//working
export async function createCompetitor(competition_id, competitor) {
    const competitors = await CompetitorModel.find({ competitionId: competition_id, competitorId: competitor.competitorId }).exec();
    if (competitors.length !== 0) {
        return competitors[0];
    }

    const competitionId = competition_id;
    const checkedIn = competitor.checkedIn == null ? false : competitor.checkedIn;
    const competitorId = competitor.competitorId == null ? "" : competitor.competitorId;
    const firstName = competitor.firstName == null ? "" : competitor.firstName;
    const lastName = competitor.lastName == null ? "" : competitor.lastName;
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

//NOT WORKING!
export async function findCompetitorByBib(bib) {
    const competitors = await CompetitorModel.find({ sortBib: bib }).exec();
    console.log("competitors ", competitors.length);
    console.log("competitor ", competitors[0]);
    if (competitors.length !== 0) {
        return competitors[0];
    }
    return null;
}