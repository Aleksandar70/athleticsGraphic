import { model } from "mongoose";
import { IResultDocument } from "../types/result.types";
import ResultSchema from "../schemas/result.schema";
  
export const ResultModel = model<IResultDocument>("result", ResultSchema);