import { ITrial, IUnit } from "../interfaces";
import { TrialModel } from "../models/trial.model";

export const createTrials = async (unit: IUnit): Promise<ITrial[]> =>
  await TrialModel.insertMany(unit.trials);
