import { SOURCE } from "../../../../global/constants/constants";
import { getOTCompetitionData } from "../../api/opentrack.api";
import { IEvent } from "../interfaces";
import { EventModel } from "../models/event.model";
import { getDataSource } from "./config.repo";
import { createUnits, getUnits } from "./unit.repo";

export const createEvents = async (events: IEvent[]): Promise<IEvent[]> => {
  if ((await EventModel.countDocuments()) > 0) return [];

  const eventModels: IEvent[] = [];
  for (const event of events) {
    const units = await createUnits(event.units ?? []);

    const eventModel = new EventModel({
      ...unwrapEvent(event),
      units: units.map((unit) => unit._id),
    });

    eventModels.push(eventModel);
  }

  return await EventModel.insertMany(eventModels);
};

export const updateEvents = async (events: IEvent[]): Promise<boolean> => {
  let result = true;
  for (const event of events) {
    const status = await EventModel.updateOne(
      { eventId: event.eventId },
      event,
      {
        omitUndefined: true,
      }
    );

    result = result && status.ok === 1;
  }

  return result;
};

export const getEvents = async (): Promise<IEvent[]> => {
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
    default:
      return await getEventsLocal();
  }
};

const getEventsLocal = async (): Promise<IEvent[]> => await EventModel.find();

const getEventsRemote = async (): Promise<IEvent[]> => {
  const { eventsData } = await getOTCompetitionData();

  for (const event of eventsData) {
    const units = await getUnits(event.units ?? []);

    await EventModel.replaceOne(
      { eventId: event.eventId },
      {
        ...unwrapEvent(event),
        units: units.map((unit) => unit?._id),
      },
      { omitUndefined: true, upsert: true, setDefaultsOnInsert: true }
    );
  }

  return await getEventsLocal();
};

const getEventsSemi = async (): Promise<IEvent[]> => {
  const { eventsData } = await getOTCompetitionData();

  for (const event of eventsData) {
    const units = await getUnits(event.units ?? []);

    await EventModel.updateOne(
      { eventId: event.eventId },
      {
        ...unwrapEvent(event),
        units: units.map((unit) => unit?._id),
      },
      { omitUndefined: true, upsert: true, setDefaultsOnInsert: true }
    );
  }

  return await getEventsLocal();
};

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
}: IEvent): IEvent => ({
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
