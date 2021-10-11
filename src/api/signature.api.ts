import type { ISignature } from "../../backend/src/database/interfaces";
import { Paths } from "../../global/constants/api";
import { getRequest, putRequest } from "../utils/api.utils";

export const addSignature = async (
  name: string
): Promise<ISignature[]> => {
  const response = await putRequest(`${Paths.SIGNATURE}/${name}`, {
    name: name,
  });
  return response.data as ISignature[];
};

export const getSignatures = async (): Promise<ISignature[]> => {
    const response = await getRequest(`${Paths.SIGNATURE}`);
    return response.data as ISignature[];
  };
