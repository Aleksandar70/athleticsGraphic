import type { IResultDocument } from "../src/database/types/result.types";
import { ResultModel } from "../src/models/result.model";

export async function createResult(basicData, result) {
    const existingResults = await ResultModel.find({ day: basicData.day, eventId: basicData.event_id, heat: basicData.heat, round: basicData.round, bib: result.bib });
    if (existingResults.length != 0) {
        return existingResults[0];
    }
    const EMPTY_STRING = "";
    const ZERO_VALUE = 0;
    const day = basicData.day ?? 1;
    const eventId = basicData.event_id ?? EMPTY_STRING;
    const eventName = basicData.event_name ?? EMPTY_STRING;
    const resultsStatus = basicData.results_status ?? EMPTY_STRING;
    const round = basicData.round ?? ZERO_VALUE;
    const showAthleteDetails = basicData.show_athlete_details ?? false;;
    const showPartials = basicData.show_partials ?? false;;
    const showPoints = basicData.show_points ?? false;
    const status = basicData.status ?? EMPTY_STRING;
    const bib = result.bib ?? ZERO_VALUE;
    const points = result.points ?? ZERO_VALUE;
    const heat = basicData.heat ?? ZERO_VALUE;


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
