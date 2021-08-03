import { Constants } from "../../../constants/constants";
import type { IResultDocument } from "../database/types/result.types";
import { ResultModel } from "../models/result.model";

export async function createResult(basicData, result) {
  const existingResults = await ResultModel.find({
    day: basicData.day,
    eventId: basicData.event_id,
    heat: basicData.heat,
    round: basicData.round,
    bib: result.bib,
  });

  if (existingResults.length != 0) {
    return existingResults[0];
  }

  const day = basicData.day ?? 1;
  const eventId = basicData.event_id ?? Constants.EMPTY_STRING;
  const eventName = basicData.event_name ?? Constants.EMPTY_STRING;
  const resultsStatus = basicData.results_status ?? Constants.EMPTY_STRING;
  const round = basicData.round ?? 0;
  const showAthleteDetails = basicData.show_athlete_details ?? false;
  const showPartials = basicData.show_partials ?? false;
  const showPoints = basicData.show_points ?? false;
  const status = basicData.status ?? Constants.EMPTY_STRING;
  const bib = result.bib ?? 0;
  const points = result.points ?? 0;
  const heat = basicData.heat ?? 0;

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
  return results.length !== 0 ? results : null;
}
