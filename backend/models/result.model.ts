import { model } from "mongoose";
import type { IResultDocument } from "../database/types/result.types";
import ResultSchema from "../database/schemas/result.schema";

export const ResultModel = model<IResultDocument>("result", ResultSchema);
