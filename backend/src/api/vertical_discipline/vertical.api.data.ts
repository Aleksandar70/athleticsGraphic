import { ResultModel } from "../../models/result.model";
import { getOpenTrackData } from "../openTrack";
import { Constants, GTYPE } from "../../../../constants/constants";

export const getVerticalResult = async (
  req,
  res,
  verticalEventId,
  verticalEvent
) => {
  const gType = req.body.gType;
  const heat = req.body.heat;
  const round = req.body.round;
  const order = req.body.order ?? "bib";

  try {
    if (gType === GTYPE.LOCAL) {
      const existingResults = await ResultModel.getResultsByHeat(
        verticalEventId,
        heat,
        round,
        order
      );
      return res.status(201).json(existingResults);
    }
    const responseData = await getOpenTrackData(
      `${verticalEvent}${round}/${heat}${Constants.JSON_NOCACHE}`
    );
    const results = responseData.results;
    if (gType === GTYPE.REMOTE) {
      for (const result of results) {
        await ResultModel.createResult(
          responseData.data,
          result,
          responseData.trials
        );
      }
    } else if (gType === GTYPE.SEMI) {
      for (const result of results) {
        await ResultModel.semiOverwriteResult(
          responseData.data,
          result,
          responseData.trials
        );
      }
    }
    const existingResults = await ResultModel.getResultsByHeat(
      verticalEventId,
      heat,
      round
    );
    return res.status(201).json(existingResults);
  } catch (err) {
    console.log(err);
  }
};

const saveVerticalResult = async (req, res) => {
  const results: IHorizontalResult = req.body;
  try {
    const existingResults = await ResultModel.updateVerticalResult(results);
    return res.status(201).json(existingResults);
  } catch (err) {
    console.log(err);
    return err;
  }
};
