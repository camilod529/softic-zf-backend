import { Router } from "express";
import { login } from "../controllers/session.controllers.js";

const router = Router();

router.post("/session/login", login);

export { router as sessionRoutes };
