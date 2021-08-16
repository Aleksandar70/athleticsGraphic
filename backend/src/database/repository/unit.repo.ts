import { UnitModel } from "../models/unit.model";
import { createResults } from "./result.repo";
import { createTrials } from "./trial.repo";

export const createUnits = async (units) => {
  const unitModels: any[] = [];
  for (const unit of units) {
    const results = await createResults(unit);
    const trials = await createTrials(unit);

    const unitModel = new UnitModel({
      results: results.map((result) => result._id),
      trials: trials.map((trial) => trial._id),
      ...unwrapUnit(unit),
    });

    unitModels.push(unitModel);
  }

  return await UnitModel.insertMany(unitModels);
};

const unwrapUnit = ({
  actualStartTime,
  day,
  distance,
  eventId,
  eventName,
  heat,
  heatName,
  heights,
  initialHeight,
  overrideCeScores,
  overridePlaces,
  precision,
  resultsStatus,
  round,
  scheduledStartTime,
  showAthleteDetails,
  showHandicap,
  showPartials,
  showPoints,
  showRawTime,
  showReactionTime,
  splitsLap,
  splitsStart,
  status,
}) => ({
  actualStartTime,
  day,
  distance,
  eventId,
  eventName,
  heat,
  heatName,
  heights,
  initialHeight,
  overrideCeScores,
  overridePlaces,
  precision,
  resultsStatus,
  round,
  scheduledStartTime,
  showAthleteDetails,
  showHandicap,
  showPartials,
  showPoints,
  showRawTime,
  showReactionTime,
  splitsLap,
  splitsStart,
  status,
});
