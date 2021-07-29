import type { ICompetitionDocument, ICompetitionModel } from "../src/database/types/competition.types";

export async function findCompetitionById(this: ICompetitionModel, competitionId) : Promise<ICompetitionDocument[]> {
    return await this.find({id: competitionId}).exec();
}

export async function findOne(this: ICompetitionModel) {
    return await this.findOne().exec();
}