import { ResultModel } from "../../models/result.model";
import { getOpenTrackData } from "../openTrack";
import { Constants, GTYPE } from "../../../../constants/constants";

export const getRunningResults = async function (
  req,
  res,
  next,
  runEventId,
  runEvent
) {
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
    } else {
      const responseData = await getOpenTrackData(
        `${runEvent}${round}"/"${heat}${Constants.JSON_NOCACHE}`
      );
      const results = responseData.results;
      for (const result of results) {
        await ResultModel.createResult(
          responseData,
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
    }
  } catch (err) {
    next(err);
  }
};

const saveRunninResult = async function (req, res, next) {
  const resultId = req.body.resultId;
  const performance = req.body.performance;
  const place = req.body.place;

  try {
    const existingResults = await ResultModel.updateRunningResult(
      resultId,
      performance,
      place
    );

    return res.status(201).json(existingResults);
  } catch (err) {
    next(err);
  }
};
