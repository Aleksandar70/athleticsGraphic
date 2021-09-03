import { Paths } from "../../global/constants/api";
import { postRequest } from "../utils/api.utils";

export const initializeData = async (): Promise<void> => {
  await postRequest(Paths.DATABASE);
};
