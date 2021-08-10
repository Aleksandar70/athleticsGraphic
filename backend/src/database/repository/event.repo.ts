import { Constants } from "../../../../global/constants/constants";
import type { IEventDocument } from "../types/event.types";
import { EventModel } from "../models/event.model";

export const createEvent = async (
  competition_id,
  event
): Promise<IEventDocument> => {
  const events = await EventModel.find({
    competitionId: competition_id,
    eventCode: event.eventCode,
    eventId: event.eventId,
  }).exec();

  if (events.length !== 0) {
    return events[0];
  }

  const competitionId = competition_id;
  const ageGroups = event.ageGroups ?? [];
  const category = event.category ?? Constants.EMPTY_STRING;
  const day = event.day ?? 0;
  const eventCode = event.eventCode ?? Constants.EMPTY_STRING;
  const eventId = event.eventId ?? Constants.EMPTY_STRING;
  const genders = event.genders ?? Constants.EMPTY_STRING;
  const name = event.name ?? Constants.EMPTY_STRING;
  const r1Time = event.r1Time ?? Constants.EMPTY_STRING;

  const newEvent = EventModel.create({
    competitionId,
    ageGroups,
    category,
    day,
    eventCode,
    eventId,
    genders,
    name,
    r1Time,
  });
  return newEvent;
};

export const getEvents = async (): Promise<IEventDocument[]> => {
  return await EventModel.find({});
};

export const editEvent = async (id, name, time, note) => {
  const event = await EventModel.findById(id).exec();
  if (event != null) {
    event.name = name;
    event.r1Time = time;
    event.note = note;
    return await event.save();
  }
  return null;
};
