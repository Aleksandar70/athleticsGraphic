import type { ISignature } from "../../backend/src/database/interfaces";
import { Paths } from "../../global/constants/api";
import { getRequest, putRequest } from "../utils/api.utils";

export const addNewSignature = async (data: any): Promise<ISignature[]> => {
  const formattedData = {};
  Object.entries(data).forEach(
    ([key, value]) => (formattedData[key.toLowerCase()] = value)
  );
  const response = await putRequest(`${Paths.SIGNATURE}`, {
    data: formattedData,
  });
  return response.data as ISignature[];
};

export const getSignatures = async (): Promise<ISignature[]> => {
  const response = await getRequest(`${Paths.SIGNATURE}`);
  return response.data as ISignature[];
};
