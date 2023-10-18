import { prisma } from "../db/prisma.js";
import {
  validateEventSchema,
  validateEventSchemaUpdate,
} from "../schemas/event.schema.js";

export const getEvents = async (req, res) => {
  await prisma.tab_evento
    .findMany()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json({ message: err }));
};

export const getEvent = async (req, res) => {
  await prisma.tab_evento
    .findUnique({
      where: {
        id_evento: parseInt(req.params.id_evento),
      },
    })
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json({ message: err }));
};

export const createEvent = async (req, res) => {
  let result = validateEventSchema(req.body);

  if (!result.success) return res.status(403).json(result.error);

  await prisma.tab_evento
    .create({
      data: result.data,
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
