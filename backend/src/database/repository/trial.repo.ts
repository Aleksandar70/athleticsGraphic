import { SOURCE } from "../../../../global/constants/constants";
import { ITrial, IUnit } from "../interfaces";
import { TrialModel } from "../models/trial.model";
import { getDataSource } from "./config.repo";

export const createTrials = async (unit: IUnit): Promise<ITrial[]> =>
  await TrialModel.insertMany(unit.trials);

export const getTrials = async (unit: IUnit) => {
  const source = await getDataSource();
  switch (source) {
    case SOURCE.REMOTE: {
      return await getTrialsRemote(unit);
    }
    case SOURCE.SEMI: {
      return await getTrialsSemi(unit);
    }
    default:
      return [];
  }
};

const getTrialsRemote = async (unit: IUnit): Promise<ITrial[]> => {
  const trialModels: ITrial[] = [];
  const trials = unit.trials ?? [];

  for (const trial of trials) {
    const trialModel = await TrialModel.findOneAndReplace(
      {
        bib: trial.bib,
      },
      trial,
      { omitUndefined: true, upsert: true, setDefaultsOnInsert: true }
    );
    trialModels.push(trialModel);
  }

  return trialModels;
};
const getTrialsSemi = async (unit: IUnit): Promise<ITrial[]> => {
  const trialModels: ITrial[] = [];
  const trials = unit.trials ?? [];

  for (const trial of trials) {
    const trialModel = await TrialModel.findOneAndUpdate(
      {
        bib: trial.bib,
      },
      trial,
      { omitUndefined: true, upsert: true, setDefaultsOnInsert: true }
    );
    trialModels.push(trialModel);
  }

  return trialModels;
};
