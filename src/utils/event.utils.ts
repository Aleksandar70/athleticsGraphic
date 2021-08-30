import { isNumeric } from "./string.utils";

export const isHeight = (value: string): boolean =>
  isNumeric(value) && value.includes(".");

export const isRound = (value: string): boolean =>
  isNumeric(value) && !value.includes(".");
