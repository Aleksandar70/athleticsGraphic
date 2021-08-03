import { ResultModel } from "../../models/result.model";
import { getOpenTrackData } from "../openTrack";
import { Constants } from "../../../../constants/constants";

const getRunningResults = async function (
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
    if (gType === Constants.GTYPE_LOCAL) {
      const existingResults = await ResultModel.getResultsByHeat(
        runEventId,
        heat,
        round,
        order
      );
      console.log("existingResults ", existingResults);
      return res.status(201).json(existingResults);
    } else {
      const responseData = await getOpenTrackData(
        runEvent + round + "/" + heat + "/json?nocache=1"
      );
      console.log("responseData ", responseData);
      const results = responseData.results;
      console.log("results ", results);
      for (let i = 0; i < results.length; i++) {
        const result = await ResultModel.createResult(
          responseData,
          results[i],
          responseData.trials
        );
        console.log(result);
      }
      const existingResults = await ResultModel.getResultsByHeat(
        runEventId,
        heat,
        round
      );
      console.log("existingResults ", existingResults);
      return res.status(201).json(existingResults);
    }
  } catch (err) {
    next(err);
  }
};

const saveRun = async function (req, res, next) {
  const resultId = req.body.resultId;
  const performance = req.body.performance;
  const place = req.body.place;

  try {
    const existingResults = await ResultModel.updateRunResult(
      resultId,
      performance,
      place
    );

    return res.status(201).json(existingResults);
  } catch (err) {
    next(err);
  }
};
