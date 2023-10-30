import fs from "fs-extra";

import { prisma } from "../db/prisma.js";
import { uploadImage } from "../libs/cloudinary.js";
import {
  validateCompanySchema,
  validateCompanySchemaUpdate,
} from "../schemas/company.schema.js";

export const getCompanies = async (req, res) => {
  try {
    let companies = await prisma.tab_empresa.findMany();

    companies = await Promise.all(
      companies.map(async (company) => {
        const colaborators = await prisma.tab_colaborador.findMany({
          where: {
            empresa_colaborador: company.nit,
          },
        });

        return {
          nit: company.nit,
          nombre_empresa: company.nombre_empresa,
          puntos: company.puntos,
          colaboradores: colaborators,
          logo: company.logo,
        };
      })
    );

    res.status(200).json(companies);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export const getCompany = async (req, res) => {
  try {
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
      nit: company.nit,
      nombre_empresa: company.nombre_empresa,
      puntos: company.puntos,
      colaboradores: colaborators,
      logo: company.logo,
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export const getCompanyByName = async (req, res) => {
  try {
    const company = await prisma.tab_empresa.findFirst({
      where: {
        nombre_empresa: req.params.nombre_empresa,
      },
    });

    const colaborators = await prisma.tab_colaborador.findMany({
      where: {
        empresa_colaborador: company.nit,
      },
    });

    res.status(200).json({
      nit: company.nit,
      nombre_empresa: company.nombre_empresa,
      puntos: company.puntos,
      colaboradores: colaborators,
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export const createCompany = async (req, res) => {
  let result = validateCompanySchema(req.body);

  if (!result.success) return res.status(403).json(result.error);

  if (req.files?.logo)
    return res.status(403).json({ message: "No file provided" });

  let logo;

  await uploadImage(req.files.foto.tempFilePath)
    .then((data) => (foto = data.url))
    .catch((err) => res.status(400).json({ message: err }));

  await fs.remove(req.files.foto.tempFilePath);

  await prisma.tab_empresa
    .create({
      data: { ...result.data, logo },
    })
    .then(() => res.status(201).json({ message: "Company created" }))
    .catch((err) => console.log(err) && res.status(400).json({ message: err }));
};

export const updateCompany = async (req, res) => {
  let result = validateCompanySchemaUpdate(req.body);

  if (!result.success) return res.status(403).json(result.error);

  let logo;

  if (req.files?.logo) {
    await uploadImage(req.files.logo.tempFilePath)
      .then((data) => (logo = data.url))
      .catch((err) => res.status(400).json({ message: err }));

    await fs.remove(req.files.foto.tempFilePath);
  }

  if (logo) {
    await prisma.tab_empresa
      .update({
        where: {
          nit: req.params.nit,
        },
        data: { ...result.data, logo },
      })
      .then(() => res.status(200).json({ message: "Company updated" }))
      .catch((err) => res.status(400).json({ message: err }));
  } else {
    await prisma.tab_empresa
      .update({
        where: {
          nit: req.params.nit,
        },
        data: result.data,
      })
      .then(() => res.status(200).json({ message: "Company updated" }))
      .catch((err) => res.status(400).json({ message: err }));
  }
};
