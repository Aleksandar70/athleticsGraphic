import axios, { AxiosResponse } from "axios";

const OPEN_TRACK_API: string =
  "https://data.opentrack.run/en-gb/x/2021/SRB/srbopenindoor/event/";

const HIGH_JUMP_FEMALE_ID: string = "F01";
const POLE_VAULT_MALE_ID: string = "F02";
const LONG_JUMP_FEMALE_ID: string = "F03";
const LONG_JUMP_MALE_ID: string = "F04";
const SHOT_PUT_MALE_ID: string = "F05";

const RUN_60M_FEMALE_ID: string = "T01";
const RUN_60M_MALE_ID: string = "T02";
const RUN_400M_FEMALE_ID: string = "T03";
const RUN_400M_MALE_ID: string = "T04";
const RUN_1500M_MALE_ID: string = "T05";
const RUN_60MH_FEMALE_ID: string = "T06";
const RUN_60MH_MALE_ID: string = "T07";

const HIGH_JUMP_FEMALE: string = `${OPEN_TRACK_API}${HIGH_JUMP_FEMALE_ID}/`;
const POLE_VAULT_MALE: string = `${OPEN_TRACK_API}${POLE_VAULT_MALE_ID}/`;
const LONG_JUMP_MALE: string = `${OPEN_TRACK_API}${LONG_JUMP_MALE_ID}/`;
const LONG_JUMP_FEMALE: string = `${OPEN_TRACK_API}${LONG_JUMP_FEMALE_ID}/`;
const SHOT_PUT_MALE: string = `${OPEN_TRACK_API}${SHOT_PUT_MALE_ID}/`;

const RUN_60M_FEMALE: string = `${OPEN_TRACK_API}${RUN_60M_FEMALE_ID}/`;
const RUN_60M_MALE: string = `${OPEN_TRACK_API}${RUN_60M_MALE_ID}/`;
const RUN_400M_FEMALE: string = `${OPEN_TRACK_API}${RUN_400M_FEMALE_ID}/`;
const RUN_400M_MALE: string = `${OPEN_TRACK_API}${RUN_400M_MALE_ID}/`;
const RUN_1500M_MALE: string = `${OPEN_TRACK_API}${RUN_1500M_MALE_ID}/`;
const RUN_60MH_FEMALE: string = `${OPEN_TRACK_API}${RUN_60MH_FEMALE_ID}/`;
const RUN_60MH_MALE: string = `${OPEN_TRACK_API}${RUN_60MH_MALE_ID}/`;

let allData = null;
let basicData = null;
let results = null;
let trials = null;
let result = null;

let resultRender = null;

const sendEventGetRequest = async (url: string) => {
  try {
    var response: AxiosResponse<any> = await axios.get(url);
    basicData = response.data;
    results = basicData.results;
    trials = basicData.trials == null ? null : basicData.trials;
    console.log("basicData -> ", basicData);
    console.log("results -> ", results);
  } catch (err) {
    console.error(err);
  }
};

// module.exports.getLongJumpM = async function (req, res, next) {
//   const gType = req.body.gType;
//   const heat = req.body.heat;
//   const round = req.body.round;
//   const order = req.body.order == null ? "bib" : req.body.order;

//   try {
//     if (gType === "local") {
//       const existingResults = await Result.getResultsByHeat(
//         LONG_JUMP_MALE_ID,
//         heat,
//         round,
//         order
//       );

//       return res.status(201).json(existingResults);
//     }

//     await sendEventGetRequest(
//       `${LONG_JUMP_MALE}${heat}/${round}/json?nocache=1`
//     );

//     if (gType === "remote") {
//       for (let i = 0; i < results.length; i++) {
//         result = await Result.createANewResult(basicData, results[i], trials);
//       }

//       const existingResults = await Result.getResultsByHeat(
//         LONG_JUMP_MALE_ID,
//         heat,
//         round
//       );

//       return res.status(201).json(existingResults);
//     } else if (gType === "semi") {
//       for (let i = 0; i < results.length; i++) {
//         result = await Result.semiOverwriteResult(
//           basicData,
//           results[i],
//           trials
//         );
//       }

//       const existingResults = await Result.getResultsByHeat(
//         LONG_JUMP_MALE_ID,
//         heat,
//         round
//       );

//       return res.status(201).json(existingResults);
//     }
//   } catch (err) {
//     next(err);
//   }
// };

// export { getLongJumpMale };
