import { SOURCE } from "../../../../global/constants/constants";
import { getOTCompetitionData } from "../../api/opentrack.api";
import { CompetitorModel } from "../models/competitor.model";
import { getDataSource } from "./config.repo";

export const createCompetitors = async (
  competitors: Record<string, unknown>[]
): Promise<void> => {
  if ((await CompetitorModel.countDocuments()) > 0) return;
  await CompetitorModel.insertMany(competitors);
};

export const findCompetitorsForEvent = async (eventId: string) => {
  const source = await getDataSource();
  switch (source) {
    case SOURCE.LOCAL: {
      return await findCompetitorsForEventLocal(eventId);
    }
    case SOURCE.REMOTE: {
      return await findCompetitorsForEventRemote(eventId);
    }
    case SOURCE.SEMI: {
      return await findCompetitorsForEventSemi(eventId);
    }
  }
};

const findCompetitorsForEventLocal = async (eventId) => {
  return await CompetitorModel.find({ event: eventId });
};

const findCompetitorsForEventRemote = async (eventId) => {
  const { competitorsData } = await getOTCompetitionData();
  for (const competitor of competitorsData) {
    await CompetitorModel.replaceOne(
      {
        competitorId: competitor.competitorId,
      },
      competitor,
      { upsert: true, setDefaultsOnInsert: true }
    );
  }
  return await CompetitorModel.find({ event: eventId });
};

const findCompetitorsForEventSemi = async (eventId) => {
  const { competitorsData } = await getOTCompetitionData();
  for (const competitor of competitorsData) {
    await CompetitorModel.updateOne(
      {
        competitorId: competitor.competitorId,
      },
      competitor,
      { omitUndefined: true, upsert: true, setDefaultsOnInsert: true }
    );
  }
  return await CompetitorModel.find({ event: eventId });
};
