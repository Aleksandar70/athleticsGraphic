/* eslint-disable */

import axios, { AxiosResponse } from "axios";
import type { IOpenTrackData } from "./interfaces/interfaces";

export const getOpenTrackData = async (url: string): Promise<IOpenTrackData> => {
  const openTrackData: IOpenTrackData = {} as IOpenTrackData;
  try {
    const response: AxiosResponse<any> = await axios.get(url);
    const responseData = response.data;
    openTrackData.data = responseData;
    openTrackData.results = responseData.results;
    openTrackData.trials = responseData.trials;
    return openTrackData;
  } catch (err) {
    console.error(err);
    return err;
  }
};
