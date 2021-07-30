import { CompetitionModel } from "../src/models/competition.model";
//working
export async function createCompetition(competition) {
    const competitions = await CompetitionModel.find({ id: competition.id }).exec();
    if (competitions.length !== 0) {
        return competitions[0];
    }
    let country = competition.country == null ? "" : competition.country;
    let date = competition.date == null ? "" : competition.date;
    let finishDate = competition.finishDate == null ? "" : competition.finishDate;
    let fullName = competition.fullName == null ? "" : competition.fullName;
    let id = competition.id == null ? "" : competition.id;
    let year = competition.year == null ? 2020 : competition.year;

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