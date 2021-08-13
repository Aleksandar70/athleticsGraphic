import { model } from "mongoose";
import UnitSchema from "../schemas/unit.schema";

export const UnitModel = model("units", UnitSchema);
