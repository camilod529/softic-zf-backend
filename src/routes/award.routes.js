import { Router } from "express";

import {
  getAwards,
  getAward,
  createAward,
  updateAwardPrice,
  updateAwardState,
  reclaimAward,
} from "../controllers/award.controller.js";

const router = Router();

router.get("/awards", getAwards);
router.get("/award/:id_premio", getAward);

router.post("/awards", createAward);
router.post("/awards/reclaim", reclaimAward);

router.put("/awards/updatePrice/:id_premio", updateAwardPrice);
router.put("/awards/updateState/:id_premio", updateAwardState);

export { router as awardRoutes };
