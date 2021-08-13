import { EventModel } from "../database/models/event.model";
import { getEvents } from "../database/repository/event.repo";
import { getOTCompetitionData } from "./opentrack.api";
import { GTYPE } from "../../../global/constants/constants";

export const getAllEvents = async (gType: string) => {
  switch (gType.toLowerCase()) {
    case GTYPE.LOCAL: {
      return getEventsLocal();
    }
    case GTYPE.REMOTE: {
      return getEventsRemote();
    }
    case GTYPE.SEMI: {
      return getEventsSemi();
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
