import { Router } from "express";

import { verifyAdmin } from "../middlewares/verifyRoles.js";
import {
  getTags,
  getTag,
  createTag,
  updateTag,
} from "../controllers/tag.controllers.js";

const router = Router();

router.get("/tags", getTags);
router.get("/tag/:id_etiqueta", getTag);

router.post("/tags", createTag);

router.put("/tags/:id_etiqueta", updateTag);

export { router as tagRoutes };
