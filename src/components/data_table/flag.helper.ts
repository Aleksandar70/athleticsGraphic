import { Regex } from "../../../global/constants/constants";

export const isFlag = (value: string): boolean =>
  value.includes("flag") && value.endsWith(".svg");

export const getAltName = (value: string): string =>
  value.match(Regex.AFTER_LAST_SLASH)?.[0].match(Regex.BEFORE_FIRST_DOT)?.[0];
