import { Router } from "express";

import {
  getAwards,
  getAward,
  createAward,
  updateAwardPrice,
  updateAwardState,
  reclaimAward,
} from "../controllers/award.controller.js";
import { verifyToken } from "../jwt/jwt.js";
import {
  verifyAdmin,
  verifyColaborator,
  verifyCompany,
} from "../middlewares/verifyRoles.js";

const router = Router();

router.get("/awards", verifyToken, getAwards);
router.get("/award/:id_premio", verifyToken, getAward);
router.get("/award/reclaimed", verifyToken, verifyColaborator, reclaimAward);

router.post("/awards", verifyToken, verifyAdmin, createAward);
router.post(
  "/awards/reclaim/:id_premio",
  verifyToken,
  verifyColaborator,
  reclaimAward
);

router.put(
  "/awards/updatePrice/:id_premio",
  verifyToken,
  verifyCompany,
  updateAwardPrice
);
router.put(
  "/awards/updateState/:id_premio",
  verifyToken,
  verifyCompany,
  updateAwardState
);

export { router as awardRoutes };
