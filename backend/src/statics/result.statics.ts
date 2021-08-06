import { Constants } from "../../../constants/constants";
import type { IResultDocument } from "../database/types/result.types";
import { ResultModel } from "../models/result.model";

//TODO: Refactor method
export async function createResult(responseData, result, trials) {
  const existingResults = await ResultModel.find({
    day: responseData.day,
    eventId: responseData.event_id,
    heat: responseData.heat,
    round: responseData.round,
    bib: result.bib,
  });
  // .populate("competitorId").exec();
  if (existingResults.length != 0) {
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
}

export async function getResults(): Promise<IResultDocument[]> {
  return await ResultModel.find();
}

export async function getResultsByEventId(eventId) {
  const results = await ResultModel.find({ eventId: eventId });
  //.populate("competitorId").exec();
  return results.length !== 0 ? results : null;
}

export async function getResultsByHeat(eventId, heat, round, order) {
  const results = await ResultModel.find({
    eventId: eventId,
    heat: heat,
    round: round,
  });
  //TODO: Explore this logic
  // .sort(order)
  // .populate("competitorId")
  // .exec();
  return results.length !== 0 ? results : null;
}

//TODO: Refactor this function
export async function semiOverwriteResult(responseData, result, trials) {
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
}

export async function updateHorizontalResult(results) {
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
}

//TODO: Refactor this function
export async function updateVerticalResult(results) {
  const result = await ResultModel.findById(results.resultId).exec();
  if (result != null) {
    result.performance = results.performance;
    if (results.place !== "") {
      result.place = parseInt(results.place);
    }
    const heights = result.heights.length;

    if (heights < 7) {
      result.result1 = results.first;
      result.result2 = results.second;
      result.result3 = results.third;
      result.result4 = results.fourth;
      result.result5 = results.fifth;
      result.result6 = results.sixth;
    } else if (heights === 7) {
      result.result2 = results.first;
      result.result3 = results.second;
      result.result4 = results.third;
      result.result5 = results.fourth;
      result.result6 = results.fifth;
      result.result7 = results.sixth;
    } else if (heights === 8) {
      result.result3 = results.first;
      result.result4 = results.second;
      result.result5 = results.third;
      result.result6 = results.fourth;
      result.result7 = results.fifth;
      result.result8 = results.sixth;
    } else if (heights === 9) {
      result.result4 = results.first;
      result.result5 = results.second;
      result.result6 = results.third;
      result.result7 = results.fourth;
      result.result8 = results.fifth;
      result.result9 = results.sixth;
    } else if (heights === 10) {
      result.result5 = results.first;
      result.result6 = results.second;
      result.result7 = results.third;
      result.result8 = results.fourth;
      result.result9 = results.fifth;
      result.result10 = results.sixth;
    } else if (heights === 11) {
      result.result6 = results.first;
      result.result7 = results.second;
      result.result8 = results.third;
      result.result9 = results.fourth;
      result.result10 = results.fifth;
      result.result11 = results.sixth;
    } else if (heights === 12) {
      result.result7 = results.first;
      result.result8 = results.second;
      result.result9 = results.third;
      result.result10 = results.fourth;
      result.result11 = results.fifth;
      result.result12 = results.sixth;
    } else if (heights === 13) {
      result.result8 = results.first;
      result.result9 = results.second;
      result.result10 = results.third;
      result.result11 = results.fourth;
      result.result12 = results.fifth;
      result.result13 = results.sixth;
    } else if (heights === 14) {
      result.result9 = results.first;
      result.result10 = results.second;
      result.result11 = results.third;
      result.result12 = results.fourth;
      result.result13 = results.fifth;
      result.result14 = results.sixth;
    } else if (heights === 15) {
      result.result10 = results.first;
      result.result11 = results.second;
      result.result12 = results.third;
      result.result13 = results.fourth;
      result.result14 = results.fifth;
      result.result15 = results.sixth;
    } else if (heights === 16) {
      result.result11 = results.first;
      result.result12 = results.second;
      result.result13 = results.third;
      result.result14 = results.fourth;
      result.result15 = results.fifth;
      result.result16 = results.sixth;
    } else if (heights === 17) {
      result.result12 = results.first;
      result.result13 = results.second;
      result.result14 = results.third;
      result.result15 = results.fourth;
      result.result16 = results.fifth;
      result.result17 = results.sixth;
    } else if (heights === 18) {
      result.result13 = results.first;
      result.result14 = results.second;
      result.result15 = results.third;
      result.result16 = results.fourth;
      result.result17 = results.fifth;
      result.result18 = results.sixth;
    } else if (heights === 19) {
      result.result14 = results.first;
      result.result15 = results.second;
      result.result16 = results.third;
      result.result17 = results.fourth;
      result.result18 = results.fifth;
      result.result19 = results.sixth;
    } else if (heights === 20) {
      result.result15 = results.first;
      result.result16 = results.second;
      result.result17 = results.third;
      result.result18 = results.fourth;
      result.result19 = results.fifth;
      result.result20 = results.sixth;
    }
    return await result.save();
  }
  return null;
}

export async function updateRunningResult(results) {
  const result = await ResultModel.findById(results.resultId).exec();
  if (result !== null) {
    result.performance = results.performance;
    if (results.place !== "") {
      result.place = parseInt(results.place);
    }
    return await result.save();
  }
  return null;
}
