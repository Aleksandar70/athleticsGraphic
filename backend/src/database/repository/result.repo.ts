import { IEvent, IResult, IUnit } from "../interfaces";
import { ResultModel } from "../models/result.model";
import { getEventLocal } from "./event.repo";

export const createResults = async (unit: IUnit): Promise<IResult[]> =>
  await ResultModel.insertMany(unit.results);

export const updateResults = async (
  updatedResults: Record<string, string>[]
): Promise<void> => {
  const eventId = updatedResults?.[0].eventId;
  const event: IEvent = await getEventLocal(eventId);
  const units: IUnit[] = event[0].units ?? [];
  const allResults = units.reduce(
    (product, current) => product.concat(current.results as IResult),
    [] as IResult[]
  );

  for (const updatedResult of updatedResults) {
    const { competitorId, result } = updatedResult;
    const resultId = allResults.find(
      (_result) => _result.bib === competitorId
    )?._id;

    await ResultModel.findByIdAndUpdate(resultId, { performance: result });
  }
};

export const getResults = async (unit: IUnit): Promise<IResult[]> => {
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
