import { TrialModel } from "../models/trial.model";

export const createTrials = async (unit) =>
  await TrialModel.insertMany(unit.trials);
