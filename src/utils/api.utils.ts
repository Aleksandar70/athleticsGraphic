import axios, { AxiosResponse } from "axios";
import type { IResultParams, ITableData } from "../../backend/src/api/interfaces/interfaces";
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

export const postRequest = async (
  params: ITableData,
  path: string
): Promise<AxiosResponse<Record<string, unknown>[]>> => {
  console.log("paramsMojeee: ", params);//dobro je
  const response = await axios.post(`${SERVER_URL}${path}`, {
    params: params,
  });
  console.log("response: ", response);
  return response;
};
