import axios, { AxiosResponse } from "axios";
import type { IResultParams } from "../../backend/src/api/interfaces/interfaces";

export const getResults = async (
  params: IResultParams
): Promise<AxiosResponse<unknown>> => {
  const response = await axios.get("http://localhost:5001/result", {
    params: params,
  });
  return response;
};
