import { model } from "mongoose";
import type { ICompetitorDocument, ICompetitorModel } from "../database/types/competitor.types";
import CompetitorSchema from "../database/schemas/competitor.schema";

export const CompetitorModel = model<ICompetitorDocument>(
  "competitor",
  CompetitorSchema
) as ICompetitorModel;
