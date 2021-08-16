import { EventModel } from "../models/event.model";
import { ResultModel } from "../models/result.model";
import { TrialModel } from "../models/trial.model";
import { UnitModel } from "../models/unit.model";

export const createEvents = async (events): Promise<void> => {
  if ((await EventModel.countDocuments()) > 0) return;

  const eventModels: any[] = [];
  for (const event of events) {
    const _units = event.units;

    const unitModels: any[] = [];

    for (const _unit of _units) {
      const _results = _unit.results;
      const _trials = _unit.trials;

      const results = await ResultModel.insertMany(_results);
      const trials = await TrialModel.insertMany(_trials);

      const unitModel = new UnitModel({
        results: results.map((result) => result._id),
        trials: trials.map((trial) => trial._id),
        ...unwrapUnit(_unit),
      });

      unitModels.push(unitModel);
    }

    const units = await UnitModel.insertMany(unitModels);

    const eventModel = new EventModel({
      units: units.map((unit) => unit._id),
      ...unwrapEvent(event),
    });

    eventModels.push(eventModel);
  }

  await EventModel.insertMany(eventModels);
};

export const getEvents = () => EventModel.find();

const unwrapEvent = ({
  ageGroups,
  cachedCount,
  category,
  ceScoreFormula,
  cutAfterRound,
  cutSurvivors,
  day,
  eventCode,
  eventId,
  genders,
  heatTimeCalculation,
  lanePrefs,
  lanes,
  maxFieldAttempts,
  maxPerHeat,
  name,
  r1Time,
  r2Day,
  r3Day,
  reorderLastRound,
  requireCallroomOverride,
  rounds,
  seedingMethod,
  showFormGuide,
  status,
  teamTypes,
}) => ({
  ageGroups,
  cachedCount,
  category,
  ceScoreFormula,
  cutAfterRound,
  cutSurvivors,
  day,
  eventCode,
  eventId,
  genders,
  heatTimeCalculation,
  lanePrefs,
  lanes,
  maxFieldAttempts,
  maxPerHeat,
  name,
  r1Time,
  r2Day,
  r3Day,
  reorderLastRound,
  requireCallroomOverride,
  rounds,
  seedingMethod,
  showFormGuide,
  status,
  teamTypes,
});

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
