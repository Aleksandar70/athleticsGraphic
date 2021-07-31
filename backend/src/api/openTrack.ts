/* eslint-disable */

import axios, { AxiosResponse } from "axios";
import type { OpenTrackData } from "./apiTypes";

const OPEN_TRACK_API =
  "https://data.opentrack.run/en-gb/x/2021/SRB/srbopenindoor/event/";

const HIGH_JUMP_F_ID = "F01";
const POLE_VAULT_M_ID = "F02";
const LONG_JUMP_F_ID = "F03";
const LONG_JUMP_M_ID = "F04";
const SHOT_PUT_M_ID = "F05";

const RUN_60M_F_ID = "T01";
const RUN_60M_M_ID = "T02";
const RUN_400M_F_ID = "T03";
const RUN_400M_M_ID = "T04";
const RUN_1500M_M_ID = "T05";
const RUN_60MH_F_ID = "T06";
const RUN_60MH_M_ID = "T07";

const HIGH_JUMP_F = `${OPEN_TRACK_API}${HIGH_JUMP_F_ID}/`;
const POLE_VAULT_M = `${OPEN_TRACK_API}${POLE_VAULT_M_ID}/`;
const LONG_JUMP_M = `${OPEN_TRACK_API}${LONG_JUMP_M_ID}/`;
const LONG_JUMP_F = `${OPEN_TRACK_API}${LONG_JUMP_F_ID}/`;
const SHOT_PUT_M = `${OPEN_TRACK_API}${SHOT_PUT_M_ID}/`;

const RUN_60M_F = `${OPEN_TRACK_API}${RUN_60M_F_ID}/`;
const RUN_60M_M = `${OPEN_TRACK_API}${RUN_60M_M_ID}/`;
const RUN_400M_F = `${OPEN_TRACK_API}${RUN_400M_F_ID}/`;
const RUN_400M_M = `${OPEN_TRACK_API}${RUN_400M_M_ID}/`;
const RUN_1500M_M = `${OPEN_TRACK_API}${RUN_1500M_M_ID}/`;
const RUN_60MH_F = `${OPEN_TRACK_API}${RUN_60MH_F_ID}/`;
const RUN_60MH_M = `${OPEN_TRACK_API}${RUN_60MH_M_ID}/`;

const getOpenTrackData = async (url: string): Promise<OpenTrackData> => {
  const openTrackData: OpenTrackData = {} as OpenTrackData;
  try {
    const response: AxiosResponse<any> = await axios.get(url);
    const responseData = response.data;
    openTrackData.data = responseData;
    openTrackData.results = responseData.results;
    openTrackData.trials = responseData.trials;
    return openTrackData;
  } catch (err) {
    console.error(err);
  }
};

export const tempGetData = async () =>
  getOpenTrackData(`${RUN_60M_M}1/1/json?nocache=1`);
