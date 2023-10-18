import { Router } from "express";

import { verifyAdmin } from "../middlewares/verifyRoles.js";
import {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
} from "../controllers/company.controllers.js";

const router = Router();

router.get("/company", getCompanies);
router.get("/company/:nit", getCompany);
router.post("/company", createCompany);
router.put("/company/:nit", updateCompany);
router.delete("/company/:nit", deleteCompany);

export { router as companyRoutes };
