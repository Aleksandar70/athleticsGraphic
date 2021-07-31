import { ResultModel } from "../../models/result.model";
const axios = require('axios');
let basicData = null;
let results = null;
let result = null;

const sendEventGetRequest = async (url) => {
    try {
        await axios.get(url)
            .then(function (response) {
                basicData = response.data;
                results = basicData.results;
            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (err) {
        console.error(err);
    }
};

const run60mM = async function (req, res, next) {
    const gType = req.body.gType;
    const heat = req.body.heat;
    const round = req.body.round;
    const order = req.body.order ?? 'bib';

    try {
        if (gType === 'local') {
            const existingResults = await ResultModel.getResultsByHeat("T02", heat, round, order);

            return res.status(201).json(existingResults);
        } else {
            await sendEventGetRequest(run60mM + round + "/" + heat + "/json?nocache=1");

            for (let i = 0; i < results.length; i++) {
                result = await ResultModel.createResult(basicData, results[i]);
                console.log(result)
            }

            const existingResults = await ResultModel.getResultsByHeat("T02", heat, round);

            return res.status(201).json(existingResults);
        }
    } catch (err) {
        next(err);
    }
}