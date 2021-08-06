import { ResultModel } from "../../database/models/result.model";
import { getOpenTrackData } from "../openTrack";
import { Constants, GTYPE } from "../../../../constants/constants";
import type { IRunningResult } from "../interfaces/interfaces";

export const getRunningResults = async (req, res, runEventId, runEvent) => {
  const gType = req.body.gType;
  const heat = req.body.heat;
  const round = req.body.round;
  const order = req.body.order ?? "bib";
  try {
    if (gType === GTYPE.LOCAL) {
      const existingResults = await ResultModel.getResultsByHeat(
        runEventId,
        heat,
        round,
        order
      );
      return res.status(201).json(existingResults);
    }
    const responseData = await getOpenTrackData(
      `${runEvent}${round}/${heat}${Constants.JSON_NOCACHE}`
    );
    const results = responseData.results;
    for (const result of results) {
      await ResultModel.createResult(
        responseData.data,
        result,
        responseData.trials
      );
    }
    const existingResults = await ResultModel.getResultsByHeat(
      runEventId,
      heat,
      round
    );
    return res.status(201).json(existingResults);
  } catch (err) {
    console.log(err);
    return err;
  }
};

const saveRunningResult = async (req, res) => {
  const results: IRunningResult = req.body;
  try {
    const existingResults = await ResultModel.updateRunningResult(results);
    return res.status(201).json(existingResults);
  } catch (err) {
    console.log(err);
    return err;
  }
};
