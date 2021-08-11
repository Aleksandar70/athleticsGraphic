import axios, { AxiosResponse } from "axios";
import type {
  IResultParams,
  ITableData,
} from "../../backend/src/api/interfaces/interfaces";
import { SERVER_URL } from "../../constants/api";

export const getRequest = async (
  params: IResultParams,
  path: string
): Promise<AxiosResponse<Record<string, unknown>[]>> => {
  const response = await axios.get(`${SERVER_URL}${path}`, {
    params: params,
  });
  return response;
};

export const putRequest = async (
  body: ITableData,
  path: string
): Promise<AxiosResponse<Record<string, unknown>[]>> => {
  const response = await axios.put(`${SERVER_URL}${path}`, body);
  return response;
};
