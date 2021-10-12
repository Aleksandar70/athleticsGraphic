import { getLockedFields } from "../database";
import { IEvent, IResult, IUnit } from "../interfaces";
import { ResultModel } from "../models/result.model";
import { getEventLocal } from "./event.repo";

export const createResults = async (unit: IUnit): Promise<IResult[]> => {
  const results = [...(unit.results ?? [])];
  results.map((result) => {
    result["heatName"] = unit.heatName ?? "single";
    result["eventId"] = unit.eventId;
  });
  return await ResultModel.insertMany(unit.results as IResult[]);
};

export const updateResults = async (
  updatedResults: Record<string, string>[]
): Promise<void> => {
  const eventId = updatedResults?.[0].eventId;
  const event: IEvent = await getEventLocal(eventId);
  const units: IUnit[] = event.units ?? [];
  const allResults = units.reduce(
    (product, current) => product.concat(current.results as IResult),
    [] as IResult[]
  );

  for (const updatedResult of updatedResults) {
    const { competitorId, teamId, eventId, result, heatName } = updatedResult;

    await ResultModel.findOneAndUpdate(
      { bib: competitorId ?? teamId, eventId: eventId, heatName: heatName },
      { performance: result }
    );
  }
};

export const getResults = async (unit: IUnit): Promise<IResult[]> => {
  const lockedFields = await getLockedFields();

  if (lockedFields.includes("result")) return [];

  const resultModels: IResult[] = [];
  const results = unit.results ?? [];

  for (const result of results) {
    const resultModel = await ResultModel.findOneAndUpdate(
      {
        bib: result.bib,
        heatName: unit.heatName ?? "single",
        eventId: unit.eventId,
      },
      result,
      { omitUndefined: true, upsert: true, setDefaultsOnInsert: true }
    );
    resultModels.push(resultModel);
  }

  return resultModels;
};
