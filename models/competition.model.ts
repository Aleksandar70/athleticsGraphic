import { model } from "mongoose";
import { ICompetitonDocument } from "../types/competition.types";
import CompetitionsSchema from "../schemas/competitions.schema";
  
export const CompetitionModel = model<ICompetitonDocument>("competition", CompetitionsSchema);