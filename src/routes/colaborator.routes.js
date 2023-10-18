import { Router } from "express";

import { verifyCompany } from "../middlewares/verifyRoles.js";
import {
  getColaborators,
  getColaborator,
  createColaborator,
  updateColaborator,
} from "../controllers/colaborator.controller.js";

const router = Router();

router.get("/colaborators", getColaborators);
router.get("/colaborator/:documento_colaborador", getColaborator);
router.post("/colaborator", createColaborator);
router.put("/colaborator/:documento_colaborador", updateColaborator);

export { router as colaboratorRoutes };
