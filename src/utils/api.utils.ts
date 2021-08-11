import axios, { AxiosResponse } from "axios";
import type { IResultParams } from "../../global/interfaces";
import { Paths } from "../../global/constants/api";

export const getRequest = async (
  path: string,
  params?: IResultParams
): Promise<AxiosResponse<Record<string, unknown>[]>> => {
  const response = await axios.get(`${Paths.SERVER_URL}${path}`, {
    params: params,
  });
  return response;
};
