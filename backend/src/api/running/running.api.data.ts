import { ResultModel } from "../../models/result.model";
import { getOpenTrackData } from "../openTrack";


const running = async function (req, res, next, runEventId, runEvent) {
    const gType = req.body.gType;
    const heat = req.body.heat;
    const round = req.body.round;
    const order = req.body.order ?? 'bib';

    try {
        if (gType === 'local') {
            const existingResults = await ResultModel.getResultsByHeat(runEventId, heat, round, order);

            return res.status(201).json(existingResults);
        } else {
            const responseData = await getOpenTrackData(runEvent + round + "/" + heat + "/json?nocache=1");
            const results = responseData.results;
            for (let i = 0; i < results.length; i++) {
                const result = await ResultModel.createResult(responseData, results[i]);
                console.log(result)
            }
            const existingResults = await ResultModel.getResultsByHeat(runEventId, heat, round);

            return res.status(201).json(existingResults);
        }
    } catch (err) {
        next(err);
    }
}

const saveRun = async function (req, res, next) {
    const resultId = req.body.resultId;
    performance = req.body.performance;
    const place = req.body.place;

    try {
        const existingResults = await ResultModel.updateRunResult(resultId, performance, place);

        return res.status(201).json(existingResults);
    } catch (err) {
        next(err);
    }
}