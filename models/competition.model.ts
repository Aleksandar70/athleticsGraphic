import { model } from "mongoose";
import { ICompetitionDocument } from "../types/competition.types";
import CompetitionSchema from "../schemas/competition.schema";

export const CompetitionModel = model<ICompetitionDocument>("competition", CompetitionSchema);
