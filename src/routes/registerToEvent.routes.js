import { Router } from "express";

import {
  registerToEvent,
  updateRegisterToEvent,
} from "../controllers/registerToEvent.controller.js";

const router = Router();

router.post("/registerToEvent", registerToEvent);
router.put("/registerToEvent", updateRegisterToEvent);

export { router as registerToEventRoutes };
