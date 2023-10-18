import { Router } from "express";

import { verifyCompany } from "../middlewares/verifyRoles.js";
import {
  getColaborators,
  getColaborator,
  createColaborator,
  updateColaborator,
  deleteColaborator,
} from "../controllers/colaborator.controller.js";

const router = Router();

router.get("/colaborators", getColaborators);
router.get("/colaborator/:documento_colaborador", getColaborator);
router.post("/colaborator", createColaborator);
router.put("/colaborator/:documento_colaborador", updateColaborator);
router.delete("/colaborator/:documento_colaborador", deleteColaborator);

export { router as colaboratorRoutes };
