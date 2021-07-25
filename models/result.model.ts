import { model } from "mongoose";
import { IResultDocument } from "../types/result.types";
import ResultsSchema from "../schemas/results.schema";
  
export const ResultModel = model<IResultDocument>("result", ResultsSchema);