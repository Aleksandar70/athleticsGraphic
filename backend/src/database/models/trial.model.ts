import { model } from "mongoose";
import TrialSchema from "../schemas/trials.schema";

export const TrialModel = model("trials", TrialSchema);
