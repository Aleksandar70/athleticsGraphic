import express from "express";
import { getEventsLocal } from "../events.api";

const router = express.Router();

router.get("/", async (_, res) => {
  const events = await getEventsLocal();
  return await res.status(200).json(events);
});

// todo : fix server side table data call

router.get("/:eventId", async (req, res) => {
  console.log("eventId =>ss ");
  const { eventId } = req.params;
  console.log("eventId => ", eventId);
  return await res.status(200).json(eventId);
});

export default router;
