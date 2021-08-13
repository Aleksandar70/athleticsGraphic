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

  if (source === SOURCE.LOCAL) {
    return await CompetitorModel.find({ event: eventId });
  }

  const { competitorsData } = await getOTCompetitionData();

  if (source === SOURCE.REMOTE) {
    for (const competitor of competitorsData) {
      await CompetitorModel.updateOne(
        {
          competitorId: competitor.competitorId,
        },
        competitor,
        { upsert: true, setDefaultsOnInsert: true }
      );
    }
    return await CompetitorModel.find({ event: eventId });
  }

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
