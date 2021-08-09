import { model } from "mongoose";
import type {
  ICompetitorDocument,
  ICompetitorModel,
} from "../types/competitor.types";
import CompetitorSchema from "../schemas/competitor.schema";

export const CompetitorModel = model<ICompetitorDocument>(
  "competitors",
  CompetitorSchema
) as ICompetitorModel;
