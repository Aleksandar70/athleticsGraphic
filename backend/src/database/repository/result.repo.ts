import { Constants } from "../../../../constants/constants";
import type { IResultDocument } from "../types/result.types";
import { ResultModel } from "../models/result.model";

export const createResult = async (responseData, result, trials) => {
  const existingResults = await ResultModel.find({
    day: responseData.day,
    eventId: responseData.event_id,
    heat: responseData.heat,
    round: responseData.round,
    bib: result.bib,
  });
  // .populate("competitorId").exec();
  if (existingResults?.length != 0) {
    return await existingResults[0].save();
  }

  const day = responseData.day ?? 1;
  const eventId = responseData.event_id ?? Constants.EMPTY_STRING;
  const eventName = responseData.event_name ?? Constants.EMPTY_STRING;
  const resultsStatus = responseData.results_status ?? Constants.EMPTY_STRING;
  const round = responseData.round ?? 0;
  const showAthleteDetails = responseData.show_athlete_details ?? false;
  const showPartials = responseData.show_partials ?? false;
  const showPoints = responseData.show_points ?? false;
  const status = responseData.status ?? Constants.EMPTY_STRING;
  const bib = result.bib ?? 0;
  const points = result.points ?? 0;
  const heat = responseData.heat ?? 0;

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
};

export const getResults = async (): Promise<IResultDocument[]> => {
  return await ResultModel.find();
};

export const getResultsByEventId = async (eventId) => {
  const results = await ResultModel.find({ eventId: eventId });
  //.populate("competitorId").exec();
  return results.length !== 0 ? results : null;
};

export const getResultsByHeat = async (eventId, heat, round) => {
  const results = await ResultModel.find({
    eventId: eventId,
    heat: heat,
    round: round,
  });
  return results.length !== 0 ? results : null;
};

//TODO: Refactor this function
export const semiOverwriteResult = async (responseData, result, trials) => {
  const heights = responseData.heights ?? [];
  const bib = result.bib ?? 0;
  const athlonPoints = result.athlon_points ?? Constants.EMPTY_STRING;
  const catpos = result.catpos ?? 0;
  const order = result.order ?? 0;
  const performance = result.performance ?? Constants.EMPTY_STRING;
  let place = result.place ?? 100;
  if (performance == Constants.PERFORMANCE_DNF) {
    place = 97;
  } else if (performance == Constants.PERFORMANCE_DQ) {
    place = 98;
  } else if (performance == Constants.PERFORMANCE_DNS) {
    place = 99;
  }

  const points = result.points ?? 0;
  const startTime = result.start_time ?? Constants.EMPTY_STRING;
  const finishTime = result.finish_time ?? Constants.EMPTY_STRING;
  const rawTime = result.raw_time ?? Constants.EMPTY_STRING;

  // const competitor = await CompetitorModel.findByBib(bib);
  // let competitorId = competitor._id;

  let round1 = "";
  let round2 = "";
  let round3 = "";
  let round4 = "";
  let round5 = "";
  let round6 = "";

  let height1 = "";
  let height2 = "";
  let height3 = "";
  let height4 = "";
  let height5 = "";
  let height6 = "";
  let height7 = "";
  let height8 = "";
  let height9 = "";
  let height10 = "";
  let height11 = "";
  let height12 = "";
  let height13 = "";
  let height14 = "";
  let height15 = "";
  let height16 = "";
  let height17 = "";
  let height18 = "";
  let height19 = "";
  let height20 = "";

  let result1 = "";
  let result2 = "";
  let result3 = "";
  let result4 = "";
  let result5 = "";
  let result6 = "";
  let result7 = "";
  let result8 = "";
  let result9 = "";
  let result10 = "";
  let result11 = "";
  let result12 = "";
  let result13 = "";
  let result14 = "";
  let result15 = "";
  let result16 = "";
  let result17 = "";
  let result18 = "";
  let result19 = "";
  let result20 = "";

  if (trials !== null) {
    for (let i = 0; i < trials.length; i++) {
      if (trials[i].bib === bib) {
        if (trials[i].round === 1) {
          round1 = trials[i].result;
        } else if (trials[i].round === 2) {
          round2 = trials[i].result;
        } else if (trials[i].round === 3) {
          round3 = trials[i].result;
        } else if (trials[i].round === 4) {
          round4 = trials[i].result;
        } else if (trials[i].round === 5) {
          round5 = trials[i].result;
        } else if (trials[i].round === 6) {
          round6 = trials[i].result;
        }
        // POPRAVITI -> I U HORIZONTALNIM SPORTOVIMA SE BELEZI REZULTAT

        for (let i = 0; i < heights.length; i++) {
          if (i == 0) height1 = heights[i];
          if (i == 1) height2 = heights[i];
          if (i == 2) height3 = heights[i];
          if (i == 3) height4 = heights[i];
          if (i == 4) height5 = heights[i];
          if (i == 5) height6 = heights[i];
          if (i == 6) height7 = heights[i];
          if (i == 7) height8 = heights[i];
          if (i == 8) height9 = heights[i];
          if (i == 9) height10 = heights[i];
          if (i == 10) height11 = heights[i];
          if (i == 11) height12 = heights[i];
          if (i == 12) height13 = heights[i];
          if (i == 13) height14 = heights[i];
          if (i == 14) height15 = heights[i];
          if (i == 15) height16 = heights[i];
          if (i == 16) height17 = heights[i];
          if (i == 17) height18 = heights[i];
          if (i == 18) height19 = heights[i];
          if (i == 19) height20 = heights[i];
        }

        if (height1 === trials[i].height) {
          result1 += trials[i].result;
        } else if (height2 === trials[i].height) {
          result2 += trials[i].result;
        } else if (height3 === trials[i].height) {
          result3 += trials[i].result;
        } else if (height4 === trials[i].height) {
          result4 += trials[i].result;
        } else if (height5 === trials[i].height) {
          result5 += trials[i].result;
        } else if (height6 === trials[i].height) {
          result6 += trials[i].result;
        } else if (height7 === trials[i].height) {
          result7 += trials[i].result;
        } else if (height8 === trials[i].height) {
          result8 += trials[i].result;
        } else if (height9 === trials[i].height) {
          result9 += trials[i].result;
        } else if (height10 === trials[i].height) {
          result10 += trials[i].result;
        } else if (height11 === trials[i].height) {
          result11 += trials[i].result;
        } else if (height12 === trials[i].height) {
          result12 += trials[i].result;
        } else if (height13 === trials[i].height) {
          result13 += trials[i].result;
        } else if (height14 === trials[i].height) {
          result14 += trials[i].result;
        } else if (height15 === trials[i].height) {
          result15 += trials[i].result;
        } else if (height16 === trials[i].height) {
          result16 += trials[i].result;
        } else if (height17 === trials[i].height) {
          result17 += trials[i].result;
        } else if (height18 === trials[i].height) {
          result18 += trials[i].result;
        } else if (height19 === trials[i].height) {
          result19 += trials[i].result;
        } else if (height20 === trials[i].height) {
          result20 += trials[i].result;
        }
      }
    }
  }

  const existingResults = await ResultModel.find({
    day: responseData.day,
    eventId: responseData.event_id,
    heat: responseData.heat,
    round: responseData.round,
    bib: result.bib,
  });
  // .populate("competitorId")
  // .exec();
  if (existingResults.length !== 0) {
    const existingResult = existingResults[0];
    existingResult.athlonPoints = athlonPoints;
    existingResult.catpos = catpos;
    existingResult.order = order;
    existingResult.performance = performance;
    existingResult.place = place;
    existingResult.points = points;
    existingResult.startTime = startTime;
    existingResult.finishTime = finishTime;
    existingResult.rawTime = rawTime;
    existingResult.reactionTime = rawTime;
    existingResult.round1 = round1 == "" ? existingResult.round1 : round1;
    existingResult.round2 = round2 == "" ? existingResult.round2 : round2;
    existingResult.round3 = round3 == "" ? existingResult.round3 : round3;
    existingResult.round4 = round4 == "" ? existingResult.round4 : round4;
    existingResult.round5 = round5 == "" ? existingResult.round5 : round5;
    existingResult.round6 = round6 == "" ? existingResult.round6 : round6;
    existingResult.height1 = height1;
    existingResult.height2 = height2;
    existingResult.height3 = height3;
    existingResult.height4 = height4;
    existingResult.height5 = height5;
    existingResult.height6 = height6;
    existingResult.height7 = height7;
    existingResult.height8 = height8;
    existingResult.height9 = height9;
    existingResult.height10 = height10;
    existingResult.height11 = height11;
    existingResult.height12 = height12;
    existingResult.height13 = height13;
    existingResult.height14 = height14;
    existingResult.height15 = height15;
    existingResult.height16 = height16;
    existingResult.height17 = height17;
    existingResult.height18 = height18;
    existingResult.height19 = height19;
    existingResult.height20 = height20;
    existingResult.result1 = result1 == "" ? existingResult.result1 : result1;
    existingResult.result2 = result2 == "" ? existingResult.result2 : result2;
    existingResult.result3 = result3 == "" ? existingResult.result3 : result3;
    existingResult.result4 = result4 == "" ? existingResult.result4 : result4;
    existingResult.result5 = result5 == "" ? existingResult.result5 : result5;
    existingResult.result6 = result6 == "" ? existingResult.result6 : result6;
    existingResult.result7 = result7 == "" ? existingResult.result7 : result7;
    existingResult.result8 = result8 == "" ? existingResult.result8 : result8;
    existingResult.result9 = result9 == "" ? existingResult.result9 : result9;
    existingResult.result10 =
      result10 == "" ? existingResult.result10 : result10;
    existingResult.result11 =
      result11 == "" ? existingResult.result11 : result11;
    existingResult.result12 =
      result12 == "" ? existingResult.result12 : result12;
    existingResult.result13 =
      result13 == "" ? existingResult.result13 : result13;
    existingResult.result14 =
      result14 == "" ? existingResult.result14 : result14;
    existingResult.result15 =
      result15 == "" ? existingResult.result15 : result15;
    existingResult.result16 =
      result16 == "" ? existingResult.result16 : result16;
    existingResult.result17 =
      result17 == "" ? existingResult.result17 : result17;
    existingResult.result18 =
      result18 == "" ? existingResult.result18 : result18;
    existingResult.result19 =
      result19 == "" ? existingResult.result19 : result19;
    existingResult.result20 =
      result20 == "" ? existingResult.result20 : result20;
    return await existingResult.save();
  }
  return null;
};

export const updateHorizontalResult = async (results) => {
  const result = await ResultModel.findById(results.resultId).exec();
  if (result != null) {
    result.performance = results.performance;
    if (results.place !== "") {
      result.place = parseInt(results.place);
    }

    result.round1 = results.first;
    result.round2 = results.second;
    result.round3 = results.third;
    result.round4 = results.fourth;
    result.round5 = results.fifth;
    result.round6 = results.sixth;

    return await result.save();
  }
  return null;
};

//TODO: Refactor this function
export const updateVerticalResult = async (results) => {
  const result = await ResultModel.findById(results.resultId).exec();
  if (result != null) {
    result.performance = results.performance;
    if (results.place !== "") {
      result.place = parseInt(results.place);
    }
    populateResultsComparingToHeights(results, result);
    return await result.save();
  }
  return null;
};

export const updateRunningResult = async (results) => {
  const result = await ResultModel.findById(results.resultId).exec();
  if (result !== null) {
    result.performance = results.performance;
    if (results.place !== "") {
      result.place = parseInt(results.place);
    }
    return await result.save();
  }
  return null;
};

function populateResultsComparingToHeights(results, result) {
  const heights = result.heights.length;
  const i = heights < 7 ? 6 : heights;
  result[`result${i}`] = results.sixth;
  result[`result${i - 1}`] = results.fifth;
  result[`result${i - 2}`] = results.fourth;
  result[`result${i - 3}`] = results.third;
  result[`result${i - 4}`] = results.second;
  result[`result${i - 5}`] = results.first;
}
