import { CompetitionModel } from "../src/models/competition.model";
//working
export async function createCompetition(competition) {
    const competitions = await CompetitionModel.find({ id: competition.id }).exec();
    if (competitions.length !== 0) {
        return competitions[0];
    }
    const country = competition.country == null ? "" : competition.country;
    const date = competition.date == null ? "" : competition.date;
    const finishDate = competition.finishDate == null ? "" : competition.finishDate;
    const fullName = competition.fullName == null ? "" : competition.fullName;
    const id = competition.id == null ? "" : competition.id;
    const year = competition.year == null ? 2020 : competition.year;

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

//working
export async function findCompetitionById(competitionId) {
    const competitions = await CompetitionModel.find({ _id: competitionId }).exec();
    if (competitions.length !== 0) {
        return competitions[0];
    }
    return null;
}