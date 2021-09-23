import { model } from "mongoose";
import RelayTeamsSchema from "../schemas/relayTeams.schema";

export const RelayTeamModel = model("relayTeams", RelayTeamsSchema);
