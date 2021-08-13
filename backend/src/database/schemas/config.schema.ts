import { Schema } from "mongoose";
import { GTYPE } from "../../../../global/constants/constants";

const ConfigSchema = new Schema({
  dataSource: {
    type: String,
    required: true,
    default: GTYPE.SEMI,
  },
});

export default ConfigSchema;
