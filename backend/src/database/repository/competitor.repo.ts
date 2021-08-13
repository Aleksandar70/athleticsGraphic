import { CompetitorModel } from "../models/competitor.model";

export const createCompetitors = async (competitors): Promise<void> => {
  if ((await CompetitorModel.countDocuments()) > 0) return;
  await CompetitorModel.insertMany(competitors);
};

export const findCompetitorsForEvent = (eventId) =>
  CompetitorModel.find({ event: eventId });
