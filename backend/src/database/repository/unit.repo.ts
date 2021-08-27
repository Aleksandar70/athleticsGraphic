import { SOURCE } from "../../../../global/constants/constants";
import { IUnit } from "../interfaces";
import { UnitModel } from "../models/unit.model";
import { getDataSource } from "./config.repo";
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
  const source = await getDataSource();
  switch (source) {
    case SOURCE.REMOTE: {
      return await getUnitsRemote(units);
    }
    case SOURCE.SEMI: {
      return await getUnitsSemi(units);
    }
    default:
      return [];
  }
};

const getUnitsRemote = async (units: IUnit[]): Promise<IUnit[]> => {
  const unitModels: IUnit[] = [];

  for (const unit of units) {
    const unwrappedUnit = unwrapUnit(unit);
    const results = await getResults(unit);
    const trials = await getTrials(unit);

    const unitModel = await UnitModel.findOneAndReplace(
      {
        eventId: unit.eventId,
        unitCode: unit.unitCode ?? "1",
      },
      {
        ...unwrappedUnit,
        results: results.map((result) => result?._id),
        trials: trials.map((trial) => trial?._id),
      },
      { omitUndefined: true, upsert: true, setDefaultsOnInsert: true }
    );
    unitModels.push(unitModel);
  }

  return unitModels;
};

const getUnitsSemi = async (units: IUnit[]): Promise<IUnit[]> => {
  const unitModels: IUnit[] = [];

  for (const unit of units) {
    const unwrappedUnit = unwrapUnit(unit);
    const results = await getResults(unit);
    const trials = await getTrials(unit);
    const unitModel = await UnitModel.findOneAndUpdate(
      {
        eventId: unit.eventId,
        unitCode: unit.unitCode ?? "1",
      },
      {
        ...unwrappedUnit,
        results: results.map((result) => result?._id),
        trials: trials.map((trial) => trial?._id),
      },
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
