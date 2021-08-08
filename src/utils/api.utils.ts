import axios, { AxiosResponse } from "axios";
import type { IResultParams } from "../../backend/src/api/interfaces/interfaces";
import { SERVER_URL } from "../../constants/api";

export const getRequest = async (
  params: IResultParams,
  path: string
): Promise<AxiosResponse<unknown>> => {
  const response = await axios.get(`${SERVER_URL}${path}`, {
    params: params,
  });
  return response;
};
