import fs from "fs-extra";

import { prisma } from "../db/prisma.js";
import { uploadImage } from "../libs/cloudinary.js";
import {
  validateAwardSchema,
  validateCoste_premio,
  validateEstado_premio,
  validateReclaimAwardSchema,
} from "../schemas/award.schema.js";

export const getAwards = async (req, res) => {
  await prisma.tab_premio
    .findMany({
      where: {
        estado_premio: true,
      },
    })
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
  console.log(req.body);

  if (req.body.coste_premio)
    req.body.coste_premio = parseInt(req.body.coste_premio);

  let result = validateAwardSchema(req.body);

  if (!result.success) return res.status(403).json(result.error);

  if (!req.files?.foto)
    return res.status(403).json({ message: "No file provided" });

  let foto;

  await uploadImage(req.files.foto.tempFilePath)
    .then((data) => (foto = data.url))
    .catch((err) => res.status(400).json(err));

  await fs.remove(req.files.foto.tempFilePath);

  await prisma.tab_premio
    .create({
      data: { ...result.data, id_premio: 0, foto },
    })
    .then(() => res.status(201).json({ message: "Award created" }))
    .catch((err) => console.log(err) && res.status(400).json(err));
};

export const updateAwardPrice = async (req, res) => {
  let result = validateCoste_premio(req.body);

  if (!result.success) return res.status(403).json(result.error);

  await prisma.tab_premio
    .update({
      where: {
        id_premio: parseInt(req.params.id_premio),
      },
      data: {
        valor_premio: result.data,
      },
    })
    .then(() => res.status(200).json({ message: "Award price updated" }))
    .catch((err) => res.status(400).json(err));
};

export const updateAwardState = async (req, res) => {
  await prisma.tab_premio
    .update({
      where: {
        id_premio: parseInt(req.params.id_premio),
      },
      data: {
        estado_premio: false,
      },
    })
    .then(() => res.status(200).json({ message: "Award state updated" }))
    .catch((err) => res.status(400).json(err));
};

export const reclaimAward = async (req, res) => {
  try {
    const id_reclamo = await prisma.tab_premio_reclamado.findMany({
      select: {
        id_premio: true,
      },
    });

    req.body.id_reclamo = id_reclamo.length + 1;
    req.body.id_premio = parseInt(req.params.id_premio);
    req.body.id_reclamante = req.decoded.documento_colaborador;

    let result = validateReclaimAwardSchema(req.body);

    if (!result.success) return res.status(403).json(result.error);

    await prisma.tab_premio.create({
      data: { ...result.data },
    });

    res.status(201).json({ message: "Award reclaimed" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
