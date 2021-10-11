import { getLockedFields } from "../database";
import { ITrial, IUnit } from "../interfaces";
import { TrialModel } from "../models/trial.model";

export const createTrials = async (unit: IUnit): Promise<ITrial[]> => {
  const trials = unit.trials ?? [];
  const formattedTrials = mergeTrialResults(trials);
  const addedTrials = await TrialModel.insertMany(formattedTrials);
  return addedTrials;
};

export const updateTrials = async (trials: ITrial[]): Promise<boolean> => {
  let _result = true;
  const isHeight = isHeightTrial(trials);

  for (const trial of trials) {
    const competitorId = trial.competitorId;
    delete trial.competitorId;

    for (const [metric, result] of Object.entries(trial)) {
      const filter = isHeight
        ? { bib: competitorId, height: metric }
        : { bib: competitorId, round: metric };

      const status = await TrialModel.updateOne(
        filter,
        { result: result },
        {
          omitUndefined: true,
        }
      );
      _result = result && status.ok === 1;
    }
  }

  return _result;
};

export const getTrials = async (unit: IUnit): Promise<ITrial[]> => {
  const trialModels: ITrial[] = [];
  const trials = unit.trials ?? [];
  const formatedTrials = mergeTrialResults(trials);

  const lockedFields = await getLockedFields();

  for (const trial of formatedTrials) {
    const filter = isHeightTrial(trials)
      ? { bib: trial.bib, height: trial.height }
      : { bib: trial.bib, round: trial.round };

    if (lockedFields.includes(trial.height ?? trial.round?.toString() ?? "")) {
      const trialModel = await TrialModel.findOne(filter);
      trialModels.push(trialModel);
      continue;
    }

    const trialModel = await TrialModel.findOneAndUpdate(
      filter,
      { ...filter, result: trial.result },
      {
        omitUndefined: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );
    trialModels.push(trialModel);
  }
  return trialModels;
};

const mergeTrialResults = (trials: ITrial[]): ITrial[] => {
  const done = new Map<string, string[]>();
  const formattedTrials: ITrial[] = [];
  for (const trial of trials) {
    const metric = trial.height ?? trial.round;
    const bibData = done.get(trial?.bib ?? "");
    if (bibData?.includes(metric as string)) continue;
    const mergedResults = trials
      .filter(
        (_trial) =>
          trial.bib === _trial.bib &&
          (_trial.height === metric || _trial.round === metric)
      )
      .reduce(
        (result, current) => (result = result.concat(current.result as string)),
        ""
      );
    formattedTrials.push({ ...trial, result: mergedResults });
    bibData
      ? done.set(trial.bib ?? "", [...bibData, metric as string])
      : done.set(trial.bib ?? "", [metric as string]);
  }
  return formattedTrials;
};

const isHeightTrial = (trials: ITrial[]): boolean =>
  Object.keys(trials?.[0]).includes("height") ||
  Object.keys(trials?.[0]).filter((key) => key.includes(".")).length > 0;
