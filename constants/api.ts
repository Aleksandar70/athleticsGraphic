export abstract class OpenTrack {
  static readonly OPEN_TRACK_API =
    "https://data.opentrack.run/en-gb/x/2021/SRB/srbopenindoor/event/";

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

  static readonly HIGH_JUMP_F = `${OpenTrack.OPEN_TRACK_API}${OpenTrack.HIGH_JUMP_F_ID}/`;
  static readonly POLE_VAULT_M = `${OpenTrack.OPEN_TRACK_API}${OpenTrack.POLE_VAULT_M_ID}/`;
  static readonly LONG_JUMP_M = `${OpenTrack.OPEN_TRACK_API}${OpenTrack.LONG_JUMP_M_ID}/`;
  static readonly LONG_JUMP_F = `${OpenTrack.OPEN_TRACK_API}${OpenTrack.LONG_JUMP_F_ID}/`;
  static readonly SHOT_PUT_M = `${OpenTrack.OPEN_TRACK_API}${OpenTrack.SHOT_PUT_M_ID}/`;

  static readonly RUN_60M_F = `${OpenTrack.OPEN_TRACK_API}${OpenTrack.RUN_60M_F_ID}/`;
  static readonly RUN_60M_M = `${OpenTrack.OPEN_TRACK_API}${OpenTrack.RUN_60M_M_ID}/`;
  static readonly RUN_400M_F = `${OpenTrack.OPEN_TRACK_API}${OpenTrack.RUN_400M_F_ID}/`;
  static readonly RUN_400M_M = `${OpenTrack.OPEN_TRACK_API}${OpenTrack.RUN_400M_M_ID}/`;
  static readonly RUN_1500M_M = `${OpenTrack.OPEN_TRACK_API}${OpenTrack.RUN_1500M_M_ID}/`;
  static readonly RUN_60MH_F = `${OpenTrack.OPEN_TRACK_API}${OpenTrack.RUN_60MH_F_ID}/`;
  static readonly RUN_60MH_M = `${OpenTrack.OPEN_TRACK_API}${OpenTrack.RUN_60MH_M_ID}/`;
}
