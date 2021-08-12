import { model } from "mongoose";
import CompetitorSchema from "../schemas/competitor.schema";

export const CompetitorModel = model("competitors", CompetitorSchema);
