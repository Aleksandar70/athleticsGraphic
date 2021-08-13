import { model } from "mongoose";
import ResultSchema from "../schemas/result.schema";

export const ResultModel = model("results", ResultSchema);
