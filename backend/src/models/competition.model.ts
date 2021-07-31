import { model } from "mongoose";
import type { ICompetitionDocument, ICompetitionModel } from "../database/types/competition.types";
import CompetitionSchema from "../database/schemas/competition.schema";

export const CompetitionModel = model<ICompetitionDocument>(
  "competition",
  CompetitionSchema
) as ICompetitionModel;
