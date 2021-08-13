import { model } from "mongoose";
import ConfigSchema from "../schemas/config.schema";

export const ConfigModel = model("config", ConfigSchema);
