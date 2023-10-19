import { Router } from "express";

import { getPointsCount } from "../controllers/points.controller.js";

const router = Router();

router.get("/points", getPointsCount);

export { router as pointsRoutes };
