import { EventModel } from "../database/models/event.model";
import { getEvents } from "../database/repository/event.repo";
import { getOTCompetitionData } from "./opentrack.api";
import { SOURCE } from "../../../global/constants/constants";
import { getDataSource } from "../database/repository/config.repo";

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
  for await (const data of eventsData) {
    EventModel.findOneAndUpdate({ eventId: data.eventId }, data);
  }
  return getEvents();
};

const getEventsSemi = async () => {
  const { eventsData } = await getOTCompetitionData();
  for await (const data of eventsData) {
    EventModel.findOneAndUpdate({ eventId: data.eventId }, data, {
      omitUndefined: true,
    });
  }
  return getEvents();
};

const getEventsLocal = () => getEvents();
