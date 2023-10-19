import { Router } from "express";

import {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
} from "../controllers/event.controller.js";

const router = Router();

router.get("/events", getEvents);
router.get("/event", getEvent);

router.post("/events/:id_evento", createEvent);

router.put("/events", updateEvent);

export { router as eventRoutes };
