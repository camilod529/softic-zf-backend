import { Router } from "express";

import {
  getComments,
  createComment,
} from "../controllers/comment.controller.js";

const router = Router();

router.get("/comments", getComments);
router.post("/comments", createComment);

export { router as commentRoutes };
