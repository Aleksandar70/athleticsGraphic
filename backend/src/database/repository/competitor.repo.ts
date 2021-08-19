import { SOURCE } from "../../../../global/constants/constants";
import { getOTCompetitionData } from "../../api/opentrack.api";
import { ICompetitor } from "../interfaces";
import { CompetitorModel } from "../models/competitor.model";
import { getDataSource } from "./config.repo";

export const createCompetitors = async (
  competitors: ICompetitor[]
): Promise<ICompetitor[]> => {
  if ((await CompetitorModel.countDocuments()) > 0) return [];
  return await CompetitorModel.insertMany(competitors);
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
    case SOURCE.SEMI: {
      return await findCompetitorsForEventSemi(eventId);
    }
    default:
      return await findCompetitorsForEventLocal(eventId);
  }
};

const findCompetitorsForEventLocal = async (
  eventId: string
): Promise<ICompetitor[]> => await CompetitorModel.find({ event: eventId });

const findCompetitorsForEventRemote = async (
  eventId: string
): Promise<ICompetitor[]> => {
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

const findCompetitorsForEventSemi = async (
  eventId: string
): Promise<ICompetitor[]> => {
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
