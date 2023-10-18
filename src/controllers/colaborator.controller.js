import { prisma } from "../db/prisma.js";
import {
  validateColaboratorSchema,
  validateColaboratorSchemaUpdate,
} from "../schemas/colaborator.schema.js";

export const getColaborators = async (req, res) => {
  await prisma.tab_colaborador
    .findMany()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json({ message: err }));
};

export const getColaborator = async (req, res) => {
  try {
    const documento_colaborador = req.params.documento_colaborador;

    await prisma.tab_colaborador
      .findUnique({
        where: {
          documento_colaborador,
        },
      })
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(400).json({ message: err }));
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export const createColaborator = async (req, res) => {
  let result = validateColaboratorSchema(req.body);

  if (!result.success) return res.status(403).json(result.error);

  await prisma.tab_colaborador
    .create({
      data: result.data,
    })
    .then(() => res.status(201).json({ message: "Colaborator created" }))
    .catch((err) => console.log(err) && res.status(400).json({ message: err }));
};

export const updateColaborator = async (req, res) => {
  let result = validateColaboratorSchemaUpdate(req.body);

  if (!result.success) return res.status(403).json(result.error);

  try {
    const documento_colaborador = req.params.documento_colaborador;

    await prisma.tab_colaborador
      .update({
        where: {
          documento_colaborador,
        },
        data: result.data,
      })
      .then(() => res.status(200).json({ message: "Colaborator updated" }))
      .catch((err) => res.status(400).json({ message: err }));
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

export const deleteColaborator = async (req, res) => {
  try {
    const documento_colaborador = req.params.documento_colaborador;

    await prisma.tab_colaborador
      .delete({
        where: {
          documento_colaborador,
        },
      })
      .then(() => res.status(200).json({ message: "Colaborator deleted" }))
      .catch((err) => res.status(400).json({ message: err }));
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};
