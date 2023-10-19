import { Router } from "express";

import { verifyAdmin } from "../middlewares/verifyRoles.js";
import {
  getCompanies,
  getCompany,
  getCompanyByName,
  createCompany,
  updateCompany,
} from "../controllers/company.controllers.js";

const router = Router();

router.get("/company", getCompanies);
router.get("/company/:nit", getCompany);
router.get("/company/name/:nombre_empresa", getCompanyByName);

router.post("/company", createCompany);
router.put("/company/:nit", updateCompany);

export { router as companyRoutes };
