import { model } from "mongoose";
import CompetitionSchema from "../schemas/competition.schema";

export const CompetitionModel = model("competition", CompetitionSchema);
