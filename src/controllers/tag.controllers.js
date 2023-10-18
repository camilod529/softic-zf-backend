import { prisma } from "../db/prisma.js";
import {
  validateTagSchema,
  validateTagSchemaUpdate,
} from "../schemas/tag.schema.js";

export const getTags = async (req, res) => {
  await prisma.tab_etiqueta
    .findMany()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json({ message: err }));
};

export const getTag = async (req, res) => {
  await prisma.tab_etiqueta
    .findUnique({
      where: {
        id_etiqueta: parseInt(req.params.id_etiqueta),
      },
    })
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json({ message: err }));
};

export const createTag = async (req, res) => {
  let result = validateTagSchema(req.body);

  if (!result.success) return res.status(403).json(result.error);

  await prisma.tab_etiqueta
    .create({
      data: result.data,
    })
    .then(() => res.status(201).json({ message: "Tag created" }))
    .catch((err) => console.log(err) && res.status(400).json({ message: err }));
};

export const updateTag = async (req, res) => {
  let result = validateTagSchemaUpdate(req.body);

  if (!result.success) return res.status(403).json(result.error);

  await prisma.tab_etiqueta
    .update({
      where: {
        id_etiqueta: parseInt(req.params.id_etiqueta),
      },
      data: result.data,
    })
    .then(() => res.status(200).json({ message: "Tag updated" }))
    .catch((err) => console.log(err) && res.status(400).json({ message: err }));
};
