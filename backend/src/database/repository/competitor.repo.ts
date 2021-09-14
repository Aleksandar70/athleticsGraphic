import { ObjectId } from "mongoose";
import { SOURCE } from "../../../../global/constants/constants";
import { getOTCompetitionData } from "../../api/opentrack.api";
import { getLockedFields } from "../database";
import { ICompetitor } from "../interfaces";
import { CompetitorModel } from "../models/competitor.model";
import { getDataSource } from "./config.repo";
import { getEvent } from "./event.repo";

export const createCompetitors = async (
  competitors: ICompetitor[]
): Promise<ICompetitor[]> => {
  const competitorModels: ICompetitor[] = [];

  for (const competitor of competitors) {
    const events: ObjectId[] = [];

    const eventEntered = competitor?.eventsEntered ?? [];

    for (const event of eventEntered) {
      const _event = await getEvent(event?.eventId ?? "");
      if (_event?._id) events.push(_event._id);
    }

    const competitorModel = new CompetitorModel({
      ...competitor,
      eventsEntered: events,
    });

    competitorModels.push(competitorModel);
  }

  await CompetitorModel.insertMany(competitorModels);
  return competitorModels;
};

export const updateCompetitors = async (
  competitors: ICompetitor[]
): Promise<boolean> => {
  let result = true;
  for (const competitor of competitors) {
    const status = await CompetitorModel.updateOne(
      { competitorId: competitor.competitorId },
      competitor,
      {
        omitUndefined: true,
      }
    );

    result = result && status.ok === 1;
  }

  return result;
};

export const findCompetitorsForEvent = async (
  eventId: string
): Promise<ICompetitor[]> => {
  const source = await getDataSource();
  switch (source) {
    case SOURCE.LOCAL: {
      return await findCompetitorsForEventLocal(eventId);
    }
    case SOURCE.REMOTE: {
      return await findCompetitorsForEventRemote(eventId);
    }
    default:
      return await findCompetitorsForEventLocal(eventId);
  }
};

const findCompetitorsForEventLocal = async (
  eventId: string
): Promise<ICompetitor[]> => {
  const competitors = await CompetitorModel.find().populate("eventsEntered");
  return competitors.filter(
    (c) => c.eventsEntered.filter((event) => event.eventId === eventId).length
  );
};

const findCompetitorsForEventRemote = async (
  eventId: string
): Promise<ICompetitor[]> => {
  const { competitorsData } = await getOTCompetitionData();

  const lockedFields = await getLockedFields();

  for (const competitor of competitorsData) {
    lockedFields.forEach((field: string) => delete competitor?.[field]);

    await CompetitorModel.updateOne(
      {
        competitorId: competitor.competitorId,
      },
      competitor,
      { omitUndefined: true, upsert: true, setDefaultsOnInsert: true }
    );
  }

  return await CompetitorModel.find({ eventsEntered: eventId });
};
