import { Router } from "express";

import { getPointsCount } from "../controllers/points.controller.js";
import { verifyToken } from "../jwt/jwt.js";

const router = Router();

router.get("/points", verifyToken, getPointsCount);

export { router as pointsRoutes };
