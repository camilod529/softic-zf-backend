import { Router } from "express";

import { verifyCompany } from "../middlewares/verifyRoles.js";
import {
  getColaborators,
  getColaborator,
  createColaborator,
  updateColaborator,
  deactivateColaborator,
  getColaboratorsByCompany,
} from "../controllers/colaborator.controller.js";
import { verifyToken } from "../jwt/jwt.js";

const router = Router();

router.get("/colaborators", verifyToken, getColaborators);
router.get(
  "/colaborators/byCompany",
  verifyToken,
  verifyCompany,
  getColaboratorsByCompany
);
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
router.put(
  "/colaborator/deactivate/:documento_colaborador",
  verifyToken,
  verifyCompany,
  deactivateColaborator
);

export { router as colaboratorRoutes };
