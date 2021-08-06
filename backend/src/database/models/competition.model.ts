import { model } from "mongoose";
import type {
  ICompetitionDocument,
  ICompetitionModel,
} from "../types/competition.types";
import CompetitionSchema from "../schemas/competition.schema";

export const CompetitionModel = model<ICompetitionDocument>(
  "competition",
  CompetitionSchema
) as ICompetitionModel;
