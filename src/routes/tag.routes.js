import { Router } from "express";

import { verifyAdmin } from "../middlewares/verifyRoles.js";
import {
  getTags,
  getTag,
  createTag,
  updateTag,
} from "../controllers/tag.controllers.js";
import { verifyToken } from "../jwt/jwt.js";

const router = Router();

router.get("/tags", verifyToken, verifyAdmin, getTags);
router.get("/tag/:id_etiqueta", verifyToken, verifyAdmin, getTag);

router.post("/tags", verifyToken, verifyAdmin, createTag);

router.put("/tags/:id_etiqueta", verifyToken, verifyAdmin, updateTag);

export { router as tagRoutes };
