import express from "express";
import { getEventsData } from "../event/event.api";

const router = express.Router();

router.get("/", async (_, res) => {
  const val = await getEventsData();
  return await res.status(200).json(val);
});

export default router;
