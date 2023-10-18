import { number, object, string } from "zod";

const companySchema = object({
  nit: string(),
  nombre_empresa: string(),
});

export const validateCompanySchema = (company) =>
  companySchema.safeParse(company);

export const validateCompanySchemaUpdate = (company) =>
  companySchema.partial().safeParse(company);
