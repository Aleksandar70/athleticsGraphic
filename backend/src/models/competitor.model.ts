import { model } from "mongoose";
import type { ICompetitorDocument } from "../database/types/competitor.types";
import CompetitorSchema from "../database/schemas/competitor.schema";

export const CompetitorModel = model<ICompetitorDocument>(
  "competitor",
  CompetitorSchema
);
