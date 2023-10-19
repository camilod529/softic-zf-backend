import { prisma } from "../db/prisma.js";
import {
  validateCompanySchema,
  validateCompanySchemaUpdate,
} from "../schemas/company.schema.js";

export const getCompanies = async (req, res) => {
  const companies = await prisma.tab_empresa.findMany();

  companies = await Promise.all(
    companies.map(async (company) => {
      const colaborators = await prisma.tab_colaborador.findMany({
        where: {
          empresa_colaborador: company.nit,
        },
      });

      return {
        nombre_empresa: company.nombre_empresa,
        puntos: company.puntos,
        colaboradores: colaborators,
      };
    })
  );

  res.status(200).json(companies);
};

export const getCompany = async (req, res) => {
  const company = await prisma.tab_empresa.findUnique({
    where: {
      nit: req.params.nit,
    },
  });

  const colaborators = await prisma.tab_colaborador.findMany({
    where: {
      empresa_colaborador: req.params.nit,
    },
  });

  res.status(200).json({
    nombre_empresa: company.nombre_empresa,
    puntos: company.puntos,
    colaboradores: colaborators,
  });
};

export const getCompanyByName = async (req, res) => {
  console.log(req.params.nombre_empresa);

  await prisma.tab_empresa
    .findFirst({
      where: {
        nombre_empresa: req.params.nombre_empresa,
      },
    })
    .then((data) => {
      const company = {
        nombre_empresa: data.nombre_empresa,
        puntos: data.puntos,
      };

      res.status(200).json(company);
    })
    .catch((err) => res.status(400).json({ message: err }));
};

export const createCompany = async (req, res) => {
  let result = validateCompanySchema(req.body);

  if (!result.success) return res.status(403).json(result.error);

  await prisma.tab_empresa
    .create({
      data: result.data,
    })
    .then(() => res.status(201).json({ message: "Company created" }))
    .catch((err) => console.log(err) && res.status(400).json({ message: err }));
};

export const updateCompany = async (req, res) => {
  let result = validateCompanySchemaUpdate(req.body);

  if (!result.success) return res.status(403).json(result.error);

  await prisma.tab_empresa
    .update({
      where: {
        nit: req.params.nit,
      },
      data: result.data,
    })
    .then(() => res.status(200).json({ message: "Company updated" }))
    .catch((err) => res.status(400).json({ message: err }));
};
