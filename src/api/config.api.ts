import { Paths } from "../../global/constants/api";
import type { IConfig } from "../../global/interfaces";
import { putRequest, getRequest, postRequest } from "../utils/api.utils";

export const updateConfig = async (config: IConfig): Promise<void> => {
  await putRequest(Paths.CONFIG, config);
};

export const getConfig = async (): Promise<IConfig> => {
  const response = await getRequest(Paths.CONFIG);
  return response.data?.[0];
};

export const addNewLocale = async (
  name: string
): Promise<Record<string, string>> => {
  const response = await postRequest(`${Paths.CONFIG}/locale`, { name: name });
  return response.data as Record<string, string>;
};

export const editLocale = async (
  editedLocale: Record<string, string>,
  name: string
): Promise<void> => {
  await putRequest(`${Paths.CONFIG}/locale`, {
    data: editedLocale,
    name: name,
  });
};
