import { OpenTrack } from "../../../../global/constants/api";
import { IOpenTrackEventData } from "../../../../global/interfaces";
import { getOpenTrackEventData } from "../openTrack";

export const getEventsData = async (): Promise<IOpenTrackEventData[]> => {
  const responseData = await getOpenTrackEventData(
    `${OpenTrack.OPEN_TRACK_API}${OpenTrack.JSON_NOCACHE}`
  );

  return responseData;
};
