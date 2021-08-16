import { ResultModel } from "../models/result.model";

export const createResults = async (unit) =>
  await ResultModel.insertMany(unit.results);
