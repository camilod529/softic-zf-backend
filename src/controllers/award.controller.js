import { prisma } from "../db/prisma.js";

import {
  validateAwardSchema,
  validateCoste_premio,
  validateEstado_premio,
} from "../schemas/award.schema.js";

export const getAwards = async (req, res) => {
  await prisma.tab_premio
    .findMany()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
};

export const getAward = async (req, res) => {
  await prisma.tab_premio
    .findUnique({
      where: {
        id_premio: parseInt(req.params.id_premio),
      },
    })
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
};

export const createAward = async (req, res) => {
  let result = validateAwardSchema(req.body);

  if (!result.success) return res.status(403).json(result.error);

  await prisma.tab_premio
    .create({
      data: result.data,
    })
    .then(() => res.status(201).json({ message: "Award created" }))
    .catch((err) => console.log(err) && res.status(400).json(err));
};

export const updateAwardPrice = async (req, res) => {
  let result = validateCoste_premio(req.body);

  if (!result.success) return res.status(403).json(result.error);

  await prisma.tab_premio.update({
    where: {
      id_premio: parseInt(req.params.id_premio),
    },
    data: {
      valor_premio: result.data,
    },
  });
};

export const updateAwardState = async (req, res) => {
  let result = validateEstado_premio(req.body);

  if (!result.success) return res.status(403).json(result.error);

  await prisma.tab_premio.update({
    where: {
      id_premio: parseInt(req.params.id_premio),
    },
    data: {
      estado_premio: result.data,
    },
  });
};
