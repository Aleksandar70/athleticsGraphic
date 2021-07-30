import type { IResultDocument } from "../src/database/types/result.types";
import { ResultModel } from "../src/models/result.model";

export async function createResult(basicData, result) {
    const existingResults = await ResultModel.find({ day: basicData.day, eventId: basicData.event_id, heat: basicData.heat, round: basicData.round, bib: result.bib });
    if (existingResults.length != 0) {
        return existingResults[0];
    }

    const day = basicData.day == null ? 1 : basicData.day;
    const eventId = basicData.event_id == null ? "" : basicData.event_id;
    const eventName = basicData.event_name == null ? "" : basicData.event_name;
    const resultsStatus = basicData.results_status == null ? "" : basicData.results_status;
    const round = basicData.round == null ? 0 : basicData.round;
    const showAthleteDetails = basicData.show_athlete_details == null ? false : basicData.show_athlete_details;
    const showPartials = basicData.show_partials == null ? false : basicData.show_partials;
    const showPoints = basicData.show_points == null ? false : basicData.show_points;
    const status = basicData.status == null ? "" : basicData.status;
    const bib = result.bib == null ? 0 : result.bib;
    const points = result.points == null ? 0 : result.points;
    const heat = basicData.heat == null ? 0 : basicData.heat;


    //TODO: Call CompetitorModel.findCompetitorByBib(bib) and take id from competitor
    const competitorId = "competitor.competitorId";

    const newResult = ResultModel.create({
        competitorId,
        day,
        eventId,
        eventName,
        resultsStatus,
        round,
        showAthleteDetails,
        showPartials,
        showPoints,
        status,
        bib,
        points,
        heat,
    });
    return newResult;
}

export async function getResults(): Promise<IResultDocument[]> {
    return await ResultModel.find();
}

export async function getResultsByEventId(eventId) {
    const results = await ResultModel.find({ eventId: eventId });
    if (results.length !== 0) {
        return results;
    }
    return null;
}