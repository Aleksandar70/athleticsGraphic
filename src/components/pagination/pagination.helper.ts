import { Constants } from "../../../global/constants/constants";

export const getMaxPage = (rowSize: number): number =>
  Math.ceil(rowSize / Constants.ROWS_PER_TABLE) - 1;
