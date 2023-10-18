import { Router } from "express";

import {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";

const router = Router();

router.get("/events", getEvents);
router.get("/event", getEvent);

router.post("/events", createEvent);

router.put("/events", updateEvent);

router.delete("/events", deleteEvent);

export { router as eventRoutes };
