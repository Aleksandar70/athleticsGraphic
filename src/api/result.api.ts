import type { AxiosResponse } from "axios";
import type { IResultParams } from "../../backend/src/api/interfaces/interfaces";
import { getRequest } from "../utils/api.utils";

export const getResults = async (
  params: IResultParams
): Promise<AxiosResponse<unknown>> => {
  return await getRequest(params, "result");
};
