import { ResultModel } from "../../models/result.model";
import { getOpenTrackData } from "../openTrack";

const getVerticalDiscipline = async function (req, res, next, verticalEventId, verticalEvent) {
    const gType = req.body.gType;
    const heat = req.body.heat;
    const round = req.body.round;
    const order = req.body.order ?? 'bib';

    try {
        if (gType === 'local') {
            const existingResults = await ResultModel.getResultsByHeat(verticalEventId, heat, round, order);

            return res.status(201).json(existingResults);
        } else {
            const responseData = await getOpenTrackData(verticalEvent + heat + "/" + round + "/json?nocache=1");
            const results = responseData.results;
            if (gType === 'remote') {
                for (let i = 0; i < results.length; i++) {
                    await ResultModel.createResult(responseData, results[i], responseData.trials);
                }

                const existingResults = await ResultModel.getResultsByHeat(verticalEventId, heat, round);

                return res.status(201).json(existingResults);
            } else if (gType === 'semi') {
                for (let i = 0; i < results.length; i++) {
                    await ResultModel.semiOverwriteResult(responseData, results[i], responseData.trials);
                }

                const existingResults = await ResultModel.getResultsByHeat(verticalEventId, heat, round);

                return res.status(201).json(existingResults);
            }
        }
    } catch (err) {
        next(err);
    }
}

const saveVertical = async function (req, res, next) {
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
        const existingResults = await ResultModel.updateVerticalResult(resultId, first, second, third, fourth, fifth, sixth, performance, place);

        return res.status(201).json(existingResults);
    } catch (err) {
        next(err);
    }
}