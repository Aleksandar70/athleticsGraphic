import { ResultModel } from "../../models/result.model";
import { getOpenTrackData } from "../openTrack";
import { Constants } from "../../../../constants/constants";

const getHorizontalResult = async function (
  req,
  res,
  next,
  horizontalEventId,
  horizontalEvent
) {
  const gType = req.body.gType;
  const heat = req.body.heat;
  const round = req.body.round;
  const order = req.body.order ?? "bib";

  try {
    if (gType === Constants.GTYPE_LOCAL) {
      const existingResults = await ResultModel.getResultsByHeat(
        horizontalEventId,
        heat,
        round,
        order
      );
      return res.status(201).json(existingResults);
    } else {
      const responseData = await getOpenTrackData(
        horizontalEventId + heat + "/" + round + "/json?nocache=1"
      );
      const results = responseData.results;
      if (gType === Constants.GTYPE_REMOTE) {
        for (let i = 0; i < results.length; i++) {
          console.log("Result.results[i] ", results[i]);
          await ResultModel.createResult(
            responseData,
            results[i],
            responseData.trials
          );
        }
      } else if (gType === Constants.GTYPE_SEMI) {
        for (let i = 0; i < results.length; i++) {
          await ResultModel.semiOverwriteResult(
            responseData,
            results[i],
            responseData.trials
          );
        }
      }
      const existingResults = await ResultModel.getResultsByHeat(
        horizontalEventId,
        heat,
        round
      );
      return res.status(201).json(existingResults);
    }
  } catch (err) {
    next(err);
  }
};

const saveHorizontal = async function (req, res, next) {
  const resultId = req.body.resultId;
  const first = req.body.first;
  const second = req.body.second;
  const third = req.body.third;
  const fourth = req.body.fourth;
  const fifth = req.body.fifth;
  const sixth = req.body.sixth;
  const performance = req.body.performance;
  const place = req.body.place;

  try {
    const existingResults = await ResultModel.updateHorizontalResult(
      resultId,
      first,
      second,
      third,
      fourth,
      fifth,
      sixth,
      performance,
      place
    );
    return res.status(201).json(existingResults);
  } catch (err) {
    next(err);
  }
};
