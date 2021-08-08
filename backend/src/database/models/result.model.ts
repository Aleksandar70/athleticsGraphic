import { model } from "mongoose";
import type {
  IResultDocument,
  IResultModel,
} from "../types/result.types";
import ResultSchema from "../schemas/result.schema";

export const ResultModel = model<IResultDocument>(
  "result",
  ResultSchema
) as IResultModel;