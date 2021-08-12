export abstract class Paths {
  static readonly SERVER_PORT = 5001;
  static readonly SERVER_URL = `http://localhost:${Paths.SERVER_PORT}/`;
  static readonly CLIENT_URL = "http://localhost:5000/";
  static readonly ROOT_PATH = "/";

  static readonly RESULTS = "results";
  static readonly RESULTS_PATH = `${Paths.ROOT_PATH}${Paths.RESULTS}`;

  static readonly EVENTS = "events";
  static readonly EVENTS_PATH = `${Paths.ROOT_PATH}${Paths.EVENTS}`;

  static readonly COMPETITOR = "competitor";
  static readonly COMPETITOR_PATH = `${Paths.ROOT_PATH}${Paths.COMPETITOR}`;
}

export abstract class OpenTrack {
  static readonly OPEN_TRACK_API =
    "https://data.opentrack.run/en-gb/x/2021/SRB/srbopenindoor";

  static readonly OPEN_TRACK_API_EVENT = `${OpenTrack.OPEN_TRACK_API}/event`;

  static readonly JSON_NOCACHE: string = "/json?nocache=1";

  static readonly HIGH_JUMP_F_ID = "F01";
  static readonly POLE_VAULT_M_ID = "F02";
  static readonly LONG_JUMP_F_ID = "F03";
  static readonly LONG_JUMP_M_ID = "F04";
  static readonly SHOT_PUT_M_ID = "F05";

  static readonly RUN_60M_F_ID = "T01";
  static readonly RUN_60M_M_ID = "T02";
  static readonly RUN_400M_F_ID = "T03";
  static readonly RUN_400M_M_ID = "T04";
  static readonly RUN_1500M_M_ID = "T05";
  static readonly RUN_60MH_F_ID = "T06";
  static readonly RUN_60MH_M_ID = "T07";

  static readonly HIGH_JUMP_F = `${OpenTrack.OPEN_TRACK_API_EVENT}${OpenTrack.HIGH_JUMP_F_ID}/`;
  static readonly POLE_VAULT_M = `${OpenTrack.OPEN_TRACK_API_EVENT}${OpenTrack.POLE_VAULT_M_ID}/`;
  static readonly LONG_JUMP_M = `${OpenTrack.OPEN_TRACK_API_EVENT}${OpenTrack.LONG_JUMP_M_ID}/`;
  static readonly LONG_JUMP_F = `${OpenTrack.OPEN_TRACK_API_EVENT}${OpenTrack.LONG_JUMP_F_ID}/`;
  static readonly SHOT_PUT_M = `${OpenTrack.OPEN_TRACK_API_EVENT}${OpenTrack.SHOT_PUT_M_ID}/`;

  static readonly RUN_60M_F = `${OpenTrack.OPEN_TRACK_API_EVENT}${OpenTrack.RUN_60M_F_ID}/`;
  static readonly RUN_60M_M = `${OpenTrack.OPEN_TRACK_API_EVENT}${OpenTrack.RUN_60M_M_ID}/`;
  static readonly RUN_400M_F = `${OpenTrack.OPEN_TRACK_API_EVENT}${OpenTrack.RUN_400M_F_ID}/`;
  static readonly RUN_400M_M = `${OpenTrack.OPEN_TRACK_API_EVENT}${OpenTrack.RUN_400M_M_ID}/`;
  static readonly RUN_1500M_M = `${OpenTrack.OPEN_TRACK_API_EVENT}${OpenTrack.RUN_1500M_M_ID}/`;
  static readonly RUN_60MH_F = `${OpenTrack.OPEN_TRACK_API_EVENT}${OpenTrack.RUN_60MH_F_ID}/`;
  static readonly RUN_60MH_M = `${OpenTrack.OPEN_TRACK_API_EVENT}${OpenTrack.RUN_60MH_M_ID}/`;
}
