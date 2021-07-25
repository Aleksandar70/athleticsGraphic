import { model } from "mongoose";
import { ICompetitionDocument } from "../types/competition.types";
import CompetitionsSchema from "../schemas/competitions.schema";
  
export const CompetitionModel = model<ICompetitionDocument>("competition", CompetitionsSchema);