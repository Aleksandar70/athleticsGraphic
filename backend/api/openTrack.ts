import axios, { AxiosResponse } from "axios";
import type { OpenTrackData } from "./apiTypes";

const OPEN_TRACK_API: string =
  "https://data.opentrack.run/en-gb/x/2021/SRB/srbopenindoor/event/";

const HIGH_JUMP_F_ID: string = "F01";
const POLE_VAULT_M_ID: string = "F02";
const LONG_JUMP_F_ID: string = "F03";
const LONG_JUMP_M_ID: string = "F04";
const SHOT_PUT_M_ID: string = "F05";

const RUN_60M_F_ID: string = "T01";
const RUN_60M_M_ID: string = "T02";
const RUN_400M_F_ID: string = "T03";
const RUN_400M_M_ID: string = "T04";
const RUN_1500M_M_ID: string = "T05";
const RUN_60MH_F_ID: string = "T06";
const RUN_60MH_M_ID: string = "T07";

const HIGH_JUMP_F: string = `${OPEN_TRACK_API}${HIGH_JUMP_F_ID}/`;
const POLE_VAULT_M: string = `${OPEN_TRACK_API}${POLE_VAULT_M_ID}/`;
const LONG_JUMP_M: string = `${OPEN_TRACK_API}${LONG_JUMP_M_ID}/`;
const LONG_JUMP_F: string = `${OPEN_TRACK_API}${LONG_JUMP_F_ID}/`;
const SHOT_PUT_M: string = `${OPEN_TRACK_API}${SHOT_PUT_M_ID}/`;

const RUN_60M_F: string = `${OPEN_TRACK_API}${RUN_60M_F_ID}/`;
const RUN_60M_M: string = `${OPEN_TRACK_API}${RUN_60M_M_ID}/`;
const RUN_400M_F: string = `${OPEN_TRACK_API}${RUN_400M_F_ID}/`;
const RUN_400M_M: string = `${OPEN_TRACK_API}${RUN_400M_M_ID}/`;
const RUN_1500M_M: string = `${OPEN_TRACK_API}${RUN_1500M_M_ID}/`;
const RUN_60MH_F: string = `${OPEN_TRACK_API}${RUN_60MH_F_ID}/`;
const RUN_60MH_M: string = `${OPEN_TRACK_API}${RUN_60MH_M_ID}/`;

const getOpenTrackData = async (url: string): Promise<OpenTrackData> => {
  let openTrackData: OpenTrackData = {} as OpenTrackData;
  try {
    var response: AxiosResponse<any> = await axios.get(url);
    const responseData = response.data;
    openTrackData.data = responseData;
    openTrackData.results = responseData.results;
    openTrackData.trials = responseData.trials;
    return openTrackData;
  } catch (err) {
    console.error(err);
  }
};
