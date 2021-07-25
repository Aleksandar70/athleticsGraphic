import { model } from "mongoose";
import { ICompetitorDocument } from "../types/competitor.types";
import CompetitorSchema from "../schemas/competitors.schema";
  
export const CompetitorModel = model<ICompetitorDocument>("competitor", CompetitorSchema);