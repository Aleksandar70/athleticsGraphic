import mongoose from "mongoose";
import { OpenTrack } from "../../../global/constants/api";
import { getOTCompetitionData } from "../api/opentrack.api";
import { createCompetition } from "./repository/competition.repo";
import { createCompetitors } from "./repository/competitor.repo";
import { createRelayTeams } from "./repository/relayTeams.repo";
import { createDefaultConfig } from "./repository/config.repo";
import { createSignatures } from "./repository/signature.repo";
import { createEvents } from "./repository/event.repo";
import level from "level-ts";

export const levelMap = new level("./levelDB");

let database: mongoose.Connection;

export const connectDatabase = async (): Promise<void> => {
  if (database) {
    return;
  }
  await mongoose.connect(
    `mongodb://0.0.0.0:27017/athletics-${OpenTrack.COMPETITION_ID}${OpenTrack.COMPETITION_YEAR}`,
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
  await createSignatures();
  const otCompetitionData = await getOTCompetitionData();
  await createCompetition(otCompetitionData.competitionData);
  await createEvents(otCompetitionData.eventsData);
  await createCompetitors(otCompetitionData.competitorsData);
  await createRelayTeams(otCompetitionData.relayTeamsData);
  console.log("Initialization complete.");
};

export const getLockedFields = async (): Promise<string[]> =>
  (await levelMap.exists("locked")) ? await levelMap.get("locked") : [];
