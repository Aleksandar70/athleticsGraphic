import { getOpenTrackData } from "../openTrack";
import { Constants, GTYPE } from "../../../../constants/constants";
import type {
  IHorizontalResult,
  IResultParams,
} from "../interfaces/interfaces";
import {
  createResult,
  getResultsByHeat,
  semiOverwriteResult,
  updateHorizontalResult,
} from "../../database/repository/result.repo";

export const getHorizontalResult = async (
  params: IResultParams,
  horizontalEventId: string,
  horizontalEvent: string
) => {
  const { gType, heat, round } = params;

  try {
    if (gType === GTYPE.LOCAL) {
      return await getResultsByHeat(horizontalEventId, heat, round);
    }
    const responseData = await getOpenTrackData(
      `${horizontalEvent}${round}/${heat}${Constants.JSON_NOCACHE}`
    );

    const createOrOverwriteResult =
      gType === GTYPE.REMOTE ? createResult : semiOverwriteResult;

    const results = responseData.results;

    for (const result of results) {
      await createOrOverwriteResult(
        responseData.data,
        result,
        responseData.trials
      );
    }

    return results;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const saveHorizontalResult = async (req, res) => {
  const results: IHorizontalResult = req.body;
  try {
    const existingResults = await updateHorizontalResult(results);
    return res.status(201).json(existingResults);
  } catch (err) {
    console.log(err);
    return err;
  }
};
