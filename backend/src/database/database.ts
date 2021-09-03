import mongoose from "mongoose";
import { OpenTrack } from "../../../global/constants/api";
import { getOTCompetitionData } from "../api/opentrack.api";
import { createCompetition } from "./repository/competition.repo";
import { createCompetitors } from "./repository/competitor.repo";
import { createDefaultConfig } from "./repository/config.repo";
import { createEvents } from "./repository/event.repo";

let database: mongoose.Connection;

export const connectDatabase = async (): Promise<void> => {
  if (database) {
    return;
  }
  await mongoose.connect(
    `mongodb://127.0.0.1:27017/athletics-${OpenTrack.COMPETITION_ID}${OpenTrack.COMPETITION_YEAR}`,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  );
};

export const disconnect = (): void => {
  if (!database) {
    return;
  }
  mongoose.disconnect();
};

export const initialize = async (): Promise<void> => {
  console.log("Initializing the database...");
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.drop();
  }

  await createDefaultConfig();
  const otCompetitionData = await getOTCompetitionData();
  await createCompetition(otCompetitionData.competitionData);
  await createCompetitors(otCompetitionData.competitorsData);
  await createEvents(otCompetitionData.eventsData);
  console.log("Initialization complete.");
};
