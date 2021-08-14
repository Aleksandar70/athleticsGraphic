import axios, { AxiosResponse } from "axios";
import { Paths } from "../../global/constants/api";

export const getRequest = async (
  path: string,
  params?: unknown
): Promise<AxiosResponse<unknown>> => {
  const response = await axios.get(`${Paths.SERVER_URL}${path}`, {
    params: params,
  });
  return response;
};

export const putRequest = async (
  path: string,
  body: unknown
): Promise<AxiosResponse<unknown>> => {
  const response = await axios.put(`${Paths.SERVER_URL}${path}`, body);
  return response;
};
