import { Router } from "express";

import {
  getComments,
  createComment,
} from "../controllers/comment.controller.js";
import { verifyToken } from "../jwt/jwt.js";
import { verifyColaborator } from "../middlewares/verifyRoles.js";

const router = Router();

router.get("/comments", verifyToken, verifyColaborator, getComments);
router.post("/comments", verifyToken, verifyColaborator, createComment);

export { router as commentRoutes };
