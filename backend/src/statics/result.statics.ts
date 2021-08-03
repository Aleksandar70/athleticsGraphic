import { Constants } from "../../../constants/constants";
import type { IResultDocument } from "../database/types/result.types";
import { ResultModel } from "../models/result.model";

export async function createResult(basicData, result, trials) {
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

export async function getResultsByHeat(eventId, heat, round, order) {
  console.log("eventId ", eventId);
  console.log("heat ", heat);
  console.log("round ", round);
  console.log("order ", order);
  const results = await ResultModel.find({
    eventId: eventId,
    heat: heat,
    round: round,
  })
    .sort(order)
    .populate("competitorId")
    .exec();
  console.log("results ", results);
  if (results.length !== 0) {
    return results;
  }
  return null;
}

export async function updateRunResult(resultId, performance, place) {
  const result = await ResultModel.findById(resultId).exec();
  if (result !== null) {
    result.performance = performance;
    if (place !== "") {
      result.place = parseInt(place);
    }

    return await result.save();
  }
  return null;
}

export async function semiOverwriteResult(responseData, result, trials) {
  return null;
}

export async function updateHorizontalResult(
  resultId,
  first,
  second,
  third,
  fourth,
  fifth,
  sixth,
  performance,
  place
) {
  const result = await ResultModel.findById(resultId).exec();
  if (result != null) {
    result.performance = performance;
    if (place !== "") {
      result.place = parseInt(place);
    }

    result.round1 = first;
    result.round2 = second;
    result.round3 = third;
    result.round4 = fourth;
    result.round5 = fifth;
    result.round6 = sixth;

    return await result.save();
  }
  return null;
}

export async function updateVerticalResult(
  resultId,
  first,
  second,
  third,
  fourth,
  fifth,
  sixth,
  performance,
  place
) {
  const result = await ResultModel.findById(resultId).exec();
  if (result != null) {
    result.performance = performance;
    if (place !== "") {
      result.place = parseInt(place);
    }
    let heights = result.heights.length;

    if (heights < 7) {
      result.result1 = first;
      result.result2 = second;
      result.result3 = third;
      result.result4 = fourth;
      result.result5 = fifth;
      result.result6 = sixth;
    } else if (heights === 7) {
      result.result2 = first;
      result.result3 = second;
      result.result4 = third;
      result.result5 = fourth;
      result.result6 = fifth;
      result.result7 = sixth;
    } else if (heights === 8) {
      result.result3 = first;
      result.result4 = second;
      result.result5 = third;
      result.result6 = fourth;
      result.result7 = fifth;
      result.result8 = sixth;
    } else if (heights === 9) {
      result.result4 = first;
      result.result5 = second;
      result.result6 = third;
      result.result7 = fourth;
      result.result8 = fifth;
      result.result9 = sixth;
    } else if (heights === 10) {
      result.result5 = first;
      result.result6 = second;
      result.result7 = third;
      result.result8 = fourth;
      result.result9 = fifth;
      result.result10 = sixth;
    } else if (heights === 11) {
      result.result6 = first;
      result.result7 = second;
      result.result8 = third;
      result.result9 = fourth;
      result.result10 = fifth;
      result.result11 = sixth;
    } else if (heights === 12) {
      result.result7 = first;
      result.result8 = second;
      result.result9 = third;
      result.result10 = fourth;
      result.result11 = fifth;
      result.result12 = sixth;
    } else if (heights === 13) {
      result.result8 = first;
      result.result9 = second;
      result.result10 = third;
      result.result11 = fourth;
      result.result12 = fifth;
      result.result13 = sixth;
    } else if (heights === 14) {
      result.result9 = first;
      result.result10 = second;
      result.result11 = third;
      result.result12 = fourth;
      result.result13 = fifth;
      result.result14 = sixth;
    } else if (heights === 15) {
      result.result10 = first;
      result.result11 = second;
      result.result12 = third;
      result.result13 = fourth;
      result.result14 = fifth;
      result.result15 = sixth;
    } else if (heights === 16) {
      result.result11 = first;
      result.result12 = second;
      result.result13 = third;
      result.result14 = fourth;
      result.result15 = fifth;
      result.result16 = sixth;
    } else if (heights === 17) {
      result.result12 = first;
      result.result13 = second;
      result.result14 = third;
      result.result15 = fourth;
      result.result16 = fifth;
      result.result17 = sixth;
    } else if (heights === 18) {
      result.result13 = first;
      result.result14 = second;
      result.result15 = third;
      result.result16 = fourth;
      result.result17 = fifth;
      result.result18 = sixth;
    } else if (heights === 19) {
      result.result14 = first;
      result.result15 = second;
      result.result16 = third;
      result.result17 = fourth;
      result.result18 = fifth;
      result.result19 = sixth;
    } else if (heights === 20) {
      result.result15 = first;
      result.result16 = second;
      result.result17 = third;
      result.result18 = fourth;
      result.result19 = fifth;
      result.result20 = sixth;
    }
    return await result.save();
  }
  return null;
}
