import type { ISignatures } from "../../backend/src/database/interfaces";
import { Paths } from "../../global/constants/api";
import { getRequest, putRequest } from "../utils/api.utils";

export const addNewSignature = async (
data: any
): Promise<ISignatures[]> => {
  const response = await putRequest(`${Paths.SIGNATURE}`, {data});
  return response.data as ISignatures[];
};

export const getSignatures = async (): Promise<ISignatures[]> => {
    const response = await getRequest(`${Paths.SIGNATURE}`);
    return response.data as ISignatures[];
  };
