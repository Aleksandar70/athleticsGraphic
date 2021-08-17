import { SOURCE } from "../../../../global/constants/constants";
import { IResult, IUnit } from "../interfaces";
import { ResultModel } from "../models/result.model";
import { getDataSource } from "./config.repo";

export const createResults = async (unit: IUnit): Promise<IResult[]> =>
  await ResultModel.insertMany(unit.results);

export const getResults = async (unit: IUnit): Promise<IResult[]> => {
  const source = await getDataSource();
  switch (source) {
    case SOURCE.REMOTE: {
      return await getResultsRemote(unit);
    }
    case SOURCE.SEMI: {
      return await getResultsSemi(unit);
    }
    default:
      return [];
  }
};

const getResultsRemote = async (unit: IUnit): Promise<IResult[]> => {
  const resultModels: IResult[] = [];
  const results = unit.results ?? [];

  for (const result of results) {
    const resultModel = await ResultModel.findOneAndReplace(
      {
        bib: result.bib,
      },
      result,
      { omitUndefined: true, upsert: true, setDefaultsOnInsert: true }
    );
    resultModels.push(resultModel);
  }

  return resultModels;
};
const getResultsSemi = async (unit: IUnit): Promise<IResult[]> => {
  const resultModels: IResult[] = [];
  const results = unit.results ?? [];

  for (const result of results) {
    const resultModel = await ResultModel.findOneAndUpdate(
      {
        bib: result.bib,
      },
      result,
      { omitUndefined: true, upsert: true, setDefaultsOnInsert: true }
    );
    resultModels.push(resultModel);
  }

  return resultModels;
};
