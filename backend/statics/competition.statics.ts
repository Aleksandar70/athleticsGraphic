import { CompetitionModel } from "../src/models/competition.model";

export async function createCompetition(competition) {
    const competitions = await CompetitionModel.find({ id: competition.id }).exec();
    if (competitions.length !== 0) {
        return competitions[0];
    }
    const EMPTY_STRING = "";
    const COMPETITION_YEAR = 2021;
    const country = competition.country ?? EMPTY_STRING;
    const date = competition.date ?? EMPTY_STRING;
    const finishDate = competition.finishDate ?? EMPTY_STRING;
    const fullName = competition.fullName ?? EMPTY_STRING;
    const id = competition.id ?? EMPTY_STRING;
    const year = competition.year ?? COMPETITION_YEAR;

    const newCompetition = CompetitionModel.create({
        country,
        date,
        finishDate,
        fullName,
        id,
        year
    });
    return newCompetition;
}

export async function findCompetitionById(competitionId) {
    const competitions = await CompetitionModel.find({ _id: competitionId }).exec();
    if (competitions.length !== 0) {
        return competitions[0];
    }
    return null;
}