import { CompetitorModel } from "../src/models/competitor.model";

//NOT WORKING!
export async function findCompetitorByBib(bib) {
    let competitors = await CompetitorModel.find({ sortBib: bib }).exec();
    console.log("competitors ", competitors.length);
    if (competitors.length !== 0) {
        return competitors[0];
    }
    return null;
}