import { Paths } from "../../global/constants/api";
import { postRequest } from "../utils/api.utils";

export const sendGraphicsData = (data: Record<string, unknown>): void => {
  postRequest(Paths.GRAPHICS, { data: data });
};

export const clearGraphics = (): void => {
  postRequest(`${Paths.GRAPHICS}/clear`);
};
