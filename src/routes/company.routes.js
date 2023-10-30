import { Router } from "express";

import { verifyAdmin } from "../middlewares/verifyRoles.js";
import {
  getCompanies,
  getCompany,
  getCompanyByName,
  createCompany,
  updateCompany,
} from "../controllers/company.controllers.js";
import { verifyToken } from "../jwt/jwt.js";

const router = Router();

router.get("/company", verifyToken, getCompanies);
router.get("/company/:nit", verifyToken, verifyAdmin, getCompany);
router.get("/company/name/:nombre_empresa", verifyToken, getCompanyByName);

router.post("/company", verifyToken, verifyAdmin, createCompany);
router.put("/company/:nit", verifyToken, verifyAdmin, updateCompany);

export { router as companyRoutes };
