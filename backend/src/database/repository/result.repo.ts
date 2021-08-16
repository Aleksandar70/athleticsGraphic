import { IResult, IUnit } from "../interfaces";
import { ResultModel } from "../models/result.model";

export const createResults = async (unit: IUnit): Promise<IResult[]> =>
  await ResultModel.insertMany(unit.results);
