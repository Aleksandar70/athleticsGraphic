import { Paths } from "../../global/constants/api";
import { putRequest, getRequest } from "../utils/api.utils";

export const updateConfig = async (config: any): Promise<any> => {
  const response = await putRequest(Paths.CONFIG, config);
  return response.data;
};

export const getConfig = async (): Promise<any> => {
  const response = await getRequest(Paths.CONFIG);
  return response.data;
};
