import { EventModel } from "../database/models/event.model";
import { getEvents } from "../database/repository/event.repo";
import { getOTCompetitionData } from "./opentrack";

export const getEventsRemote = async () => {
  const { eventsData } = await getOTCompetitionData();
  for await (const data of eventsData) {
    EventModel.findOneAndUpdate({ eventId: data.eventId }, data);
  }
  return getEvents();
};

export const getEventsSemi = async () => {
  const { eventsData } = await getOTCompetitionData();
  for await (const data of eventsData) {
    EventModel.findOneAndUpdate({ eventId: data.eventId }, data, {
      omitUndefined: true,
    });
  }
  return getEvents();
};

export const getEventsLocal = () => getEvents();
