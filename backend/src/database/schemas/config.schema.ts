import { Schema } from "mongoose";
import { SOURCE } from "../../../../global/constants/constants";

const ConfigSchema = new Schema({
  dataSource: {
    type: String,
    required: false,
    default: SOURCE.REMOTE,
  },
  selectedLanguage: {
    type: String,
    required: false,
    default: "default",
  },
  languages: {
    type: Array,
    required: false,
    default: ["default"],
  },
});

export default ConfigSchema;
