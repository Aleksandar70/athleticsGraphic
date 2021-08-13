import { Paths } from "../../global/constants/api";
import type { IConfig } from "../../global/interfaces";
import { putRequest, getRequest } from "../utils/api.utils";

export const updateConfig = async (config: IConfig): Promise<void> => {
  await putRequest(Paths.CONFIG, config);
};

export const getConfig = async (): Promise<IConfig> => {
  const response = await getRequest(Paths.CONFIG);
  return response.data?.[0];
};
