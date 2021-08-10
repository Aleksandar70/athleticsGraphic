/* eslint-disable */

import axios, { AxiosResponse } from "axios";
import type {
  IOpenTrackData,
  IOpenTrackEventData,
} from "../../../global/interfaces";

export const getOpenTrackData = async (
  url: string
): Promise<IOpenTrackData> => {
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

export const getOpenTrackEventData = async (
  url: string
): Promise<IOpenTrackEventData[]> => {
  const eventData: IOpenTrackEventData[] = [] as IOpenTrackEventData[];
  try {
    const response: AxiosResponse<any> = await axios.get(url);
    const responseData = response.data;
    responseData.events.forEach((event) => eventData.push(unwrap(event)));
    return eventData;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const unwrap = ({ eventId, name, genders, status, rounds, r1Time }) => ({
  eventId,
  name,
  genders,
  status,
  rounds,
  r1Time,
});
