import { Schema } from "mongoose";
import { SOURCE } from "../../../../global/constants/constants";

const ConfigSchema = new Schema({
  dataSource: {
    type: String,
    required: true,
    default: SOURCE.REMOTE,
  },
});

export default ConfigSchema;
