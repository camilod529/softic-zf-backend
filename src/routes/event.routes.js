import { Router } from "express";

import {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deactivateEvent,
} from "../controllers/event.controller.js";
import { verifyToken } from "../jwt/jwt.js";
import { verifyAdmin } from "../middlewares/verifyRoles.js";

const router = Router();

router.get("/events", verifyToken, getEvents);
router.get("/event/:id_evento", verifyToken, getEvent);

router.post("/events/", verifyToken, verifyAdmin, createEvent);

router.put("/events", verifyToken, verifyAdmin, updateEvent);
router.put("/events/deactivate/:id_evento", verifyToken, verifyAdmin, deactivateEvent);

export { router as eventRoutes };
