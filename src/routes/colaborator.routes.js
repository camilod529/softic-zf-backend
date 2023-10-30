import { Router } from "express";

import { verifyCompany } from "../middlewares/verifyRoles.js";
import {
  getColaborators,
  getColaborator,
  createColaborator,
  updateColaborator,
} from "../controllers/colaborator.controller.js";
import { verifyToken } from "../jwt/jwt.js";

const router = Router();

router.get("/colaborators", verifyToken, verifyCompany, getColaborators);
router.get(
  "/colaborator/:documento_colaborador",
  verifyToken,
  verifyCompany,
  getColaborator
);
router.post("/colaborator", verifyToken, verifyCompany, createColaborator);
router.put(
  "/colaborator/:documento_colaborador",
  verifyToken,
  verifyCompany,
  updateColaborator
);

export { router as colaboratorRoutes };
