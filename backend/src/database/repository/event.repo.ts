import { SOURCE } from "../../../../global/constants/constants";
import { getOTCompetitionData } from "../../api/opentrack.api";
import { EventModel } from "../models/event.model";
import { getDataSource } from "./config.repo";
import { createUnits } from "./unit.repo";

export const createEvents = async (events): Promise<void> => {
  if ((await EventModel.countDocuments()) > 0) return;

  const eventModels: any[] = [];
  for (const event of events) {
    const units = await createUnits(event.units);

    const eventModel = new EventModel({
      units: units.map((unit) => unit._id),
      ...unwrapEvent(event),
    });

    eventModels.push(eventModel);
  }

  await EventModel.insertMany(eventModels);
};

export const getAllEvents = async () => {
  const source = await getDataSource();
  switch (source.toLowerCase()) {
    case SOURCE.LOCAL: {
      return await getEventsLocal();
    }
    case SOURCE.REMOTE: {
      return await getEventsRemote();
    }
    case SOURCE.SEMI: {
      return await getEventsSemi();
    }
  }
};

const getEventsRemote = async () => {
  const { eventsData } = await getOTCompetitionData();
  for (const data of eventsData) {
    await EventModel.replaceOne({ eventId: data.eventId }, unwrapEvent(data));
  }
  return getEventsLocal();
};

const getEventsSemi = async () => {
  const { eventsData } = await getOTCompetitionData();
  for await (const data of eventsData) {
    EventModel.findOneAndUpdate({ eventId: data.eventId }, data, {
      omitUndefined: true,
    });
  }
  return getEventsLocal();
};

const getEventsLocal = async () => await EventModel.find();

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
