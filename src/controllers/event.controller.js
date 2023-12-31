import fs from "fs-extra";

import { prisma } from "../db/prisma.js";
import { uploadImage } from "../libs/cloudinary.js";
import {
  validateEventSchema,
  validateEventSchemaUpdate,
} from "../schemas/event.schema.js";

export const getEvents = async (req, res) => {
  try {
    let eventos = await prisma.tab_evento.findMany({
      where: { estado_boolean: true },
    });

    eventos = await Promise.all(
      eventos.map(async (evento) => {
        const etiquetas = await prisma.tab_etiquetasxevento.findMany({
          where: {
            id_evento: evento.id_evento,
          },
        });

        return { ...evento, etiquetas };
      })
    );

    res.status(200).json(eventos);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

export const getEvent = async (req, res) => {
  try {
    let evento = await prisma.tab_evento.findUnique({
      where: {
        id_evento: parseInt(req.params.id_evento),
      },
    });

    const etiquetas = await prisma.tab_etiquetasxevento.findMany({
      where: {
        id_evento: evento.id_evento,
      },
    });

    res.status(200).json({ ...evento, etiquetas });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export const createEvent = async (req, res) => {
  try {
    req.body.aforo_maximo = parseInt(req.body.aforo_maximo);
    req.body.aforo_registrado = parseInt(req.body.aforo_registrado);
    req.body.puntos_colaborador = parseInt(req.body.puntos_colaborador);
    req.body.puntos_empresa = parseInt(req.body.puntos_empresa);
    req.body.puntos_castigo = parseInt(req.body.puntos_castigo);
  } catch (err) {
    res.status(400).json({ message: err });
  }

  try {
    const { id_evento } = await prisma.tab_evento.findFirst({
      orderBy: {
        id_evento: "desc",
      },
    });

    req.body.id_evento = id_evento + 1;
  } catch (err) {
    res.status(400).json({ message: err });
  }

  let result = validateEventSchema(req.body);

  if (!result.success) return res.status(403).json(result.error);

  if (!req.files?.foto_evento)
    return res.status(403).json({ message: "No file provided" });

  let foto_evento;

  await uploadImage(req.files.foto_evento.tempFilePath)
    .then((data) => (foto_evento = data.url))
    .catch((err) => res.status(400).json({ message: err }));

  await fs.remove(req.files.foto_evento.tempFilePath);

  await prisma.tab_evento
    .create({
      data: { ...result.data, foto_evento },
    })
    .then(() => res.status(201).json({ message: "Event created" }))
    .catch((err) => res.status(400).json({ message: err }));
};

export const updateEvent = async (req, res) => {
  let result = validateEventSchemaUpdate(req.body);

  if (!result.success) return res.status(403).json(result.error);

  await prisma.tab_evento
    .update({
      where: {
        id_evento: parseInt(req.params.id_evento),
      },
      data: result.data,
    })
    .then(() => res.status(200).json({ message: "Event updated" }))
    .catch((err) => console.log(err) && res.status(400).json({ message: err }));
};

export const deactivateEvent = async (req, res) => {
  await prisma.tab_evento
    .update({
      where: {
        id_evento: parseInt(req.params.id_evento),
      },
      data: {
        estado_boolean: false,
      },
    })
    .then(() => res.status(200).json({ message: "Event deactivated" }))
    .catch((err) => res.status(400).json({ message: err }));
};
