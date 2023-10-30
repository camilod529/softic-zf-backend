import { Router } from "express";

import {
  registerToEvent,
  updateRegisterToEvent,
} from "../controllers/registerToEvent.controller.js";
import { verifyToken } from "../jwt/jwt.js";
import { verifyColaborator } from "../middlewares/verifyRoles.js";

const router = Router();

router.post(
  "/registerToEvent",
  verifyToken,
  verifyColaborator,
  registerToEvent
);
router.put("/registerToEvent", updateRegisterToEvent);

export { router as registerToEventRoutes };
