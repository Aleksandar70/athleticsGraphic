import type { IResultDocument } from "../src/database/types/result.types";
import { ResultModel } from "../src/models/result.model";

//working
export async function createResult(basicData, result) {
    const existingResults = await ResultModel.find({ day: basicData.day, eventId: basicData.event_id, heat: basicData.heat, round: basicData.round, bib: result.bib });
    if (existingResults.length != 0) {
        return existingResults[0];
    }

    let day = basicData.day == null ? 1 : basicData.day;
    let eventId = basicData.event_id == null ? "" : basicData.event_id;
    let eventName = basicData.event_name == null ? "" : basicData.event_name;
    let resultsStatus = basicData.results_status == null ? "" : basicData.results_status;
    let round = basicData.round == null ? 0 : basicData.round;
    let showAthleteDetails = basicData.show_athlete_details == null ? false : basicData.show_athlete_details;
    let showPartials = basicData.show_partials == null ? false : basicData.show_partials;
    let showPoints = basicData.show_points == null ? false : basicData.show_points;
    let status = basicData.status == null ? "" : basicData.status;
    let bib = result.bib == null ? 0 : result.bib;
    let points = result.points == null ? 0 : result.points;
    let heat = basicData.heat == null ? 0 : basicData.heat;


    //TODO: Call CompetitorModel.findCompetitorByBib(bib) and take id from competitor
    let competitorId = "competitor.competitorId"; 

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

//working
export async function getResults(): Promise<IResultDocument[]> {
    return await ResultModel.find();
}

//working
export async function getResultsByEventId(eventId) {
    const results = await ResultModel.find({ eventId: eventId });
    if (results.length !== 0) {
        return results;
    } 
    return null;
}