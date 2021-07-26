import { model } from "mongoose";
import { ICompetitorDocument } from "../types/competitor.types";
import CompetitorSchema from "../schemas/competitor.schema";
  
export const CompetitorModel = model<ICompetitorDocument>("competitor", CompetitorSchema);