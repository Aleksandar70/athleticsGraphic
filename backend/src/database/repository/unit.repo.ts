import { getLockedFields } from "../database";
import { IUnit } from "../interfaces";
import { UnitModel } from "../models/unit.model";
import { createResults, getResults } from "./result.repo";
import { createTrials, getTrials } from "./trial.repo";

export const createUnits = async (units: IUnit[]): Promise<IUnit[]> => {
  const unitModels: IUnit[] = [];
  for (const unit of units) {
    const results = await createResults(unit);
    const trials = await createTrials(unit);

    const unitModel = new UnitModel({
      results: results.map((result) => result?._id),
      trials: trials.map((trial) => trial?._id),
      ...unwrapUnit(unit),
    });

    unitModels.push(unitModel);
  }

  return await UnitModel.insertMany(unitModels);
};

export const getUnits = async (units: IUnit[]): Promise<IUnit[]> => {
  const unitModels: IUnit[] = [];

  const lockedFields = await getLockedFields();

  for (const unit of units) {
    const unwrappedUnit = unwrapUnit(unit);
    const results = await getResults(unit);
    const trials = await getTrials(unit);

    const updatedModel = lockedFields.includes("result")
      ? {
          ...unwrappedUnit,
          trials: trials.map((trial) => trial?._id),
        }
      : {
          ...unwrappedUnit,
          results: results.map((result) => result?._id),
          trials: trials.map((trial) => trial?._id),
        };

    const unitModel = await UnitModel.findOneAndUpdate(
      {
        eventId: unit.eventId,
        unitCode: unit.unitCode ?? "1",
      },
      updatedModel,
      { omitUndefined: true, upsert: true, setDefaultsOnInsert: true }
    );
    unitModels.push(unitModel);
  }

  return unitModels;
};

const unwrapUnit = ({
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
  rounds,
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
  unitCode,
}: IUnit): IUnit => ({
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
  rounds,
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
  unitCode,
});
