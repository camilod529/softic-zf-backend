import { Router } from "express";

import { verifyAdmin } from "../middlewares/verifyRoles.js";
import {
  getTags,
  getTag,
  createTag,
  updateTag,
  setTagsToColaborator,
  getTagsToColaborator,
} from "../controllers/tag.controllers.js";
import { verifyToken } from "../jwt/jwt.js";

const router = Router();

router.get("/tags", verifyToken, getTags);
router.get("/tag/:id_etiqueta", verifyToken, getTag);
router.get("/tagsByColaborator", verifyToken, getTagsToColaborator);

router.post("/tags", verifyToken, verifyAdmin, createTag);
router.post("/tags/setTagsToColaborator", verifyToken, setTagsToColaborator);

router.put("/tags/:id_etiqueta", verifyToken, verifyAdmin, updateTag);

export { router as tagRoutes };
