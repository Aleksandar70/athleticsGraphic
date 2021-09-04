import express, { Request, Response } from "express";
import { levelMap } from "../../database/database";
import { IEvent } from "../../database/interfaces";
import {
  getEvent,
  getEvents,
  updateEvents,
} from "../../database/repository/event.repo";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const { locked } = req.query;
  await levelMap.put("locked", locked ?? []);
  const events = await getEvents();
  return res.status(200).json(events);
});

router.get("/:eventId", async (req: Request, res: Response) => {
  const { eventId } = req.params;
  const { locked } = req.query;
  await levelMap.put("locked", locked ?? []);
  const event = await getEvent(eventId);
  return res.status(200).json(event);
});

router.put("/", async (req: Request, res: Response) => {
  const newData: IEvent[] = req.body;
  const result = await updateEvents(newData);
  return res.status(200).json(result);
});

export default router;
