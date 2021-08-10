import { getOpenTrackData } from "../openTrack";
import { GTYPE } from "../../../../global/constants/constants";
import type {
  IHorizontalResult,
  IResultParams,
} from "../../../../global/interfaces";
import {
  createResult,
  getResultsByHeat,
  semiOverwriteResult,
  updateHorizontalResult,
} from "../../database/repository/result.repo";
import { OpenTrack } from "../../../../global/constants/api";

export const getResultForEvent = async (params: IResultParams) => {
  const { eventId, gType, heat = 1, round = 1 } = params;

  try {
    if (gType === GTYPE.LOCAL) {
      return await getResultsByHeat(eventId, heat, round);
    }
    const responseData = await getOpenTrackData(
      `${OpenTrack.OPEN_TRACK_API_EVENT}/${eventId}/${round}/${heat}${OpenTrack.JSON_NOCACHE}`
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
