import { prisma } from "../db/prisma.js";
import {
  validateRegisterToEventSchema,
  validateRegisterToEventSchemaUpdate,
} from "../schemas/registerToEvent.schema.js";

export const registerToEvent = async (req, res) => {
  let result = validateRegisterToEventSchema(req.body);

  if (!result.success) return res.status(403).json(result.error);

  await prisma.tab_registroxevento
    .create({
      data: result.data,
    })
    .then(() => res.status(201).json({ message: "Register to event created" }))
    .catch((err) => res.status(400).json(err));
};

export const updateRegisterToEvent = async (req, res) => {
  let result = validateRegisterToEventSchemaUpdate(req.body);

  if (!result.success) return res.status(403).json(result.error);

  await prisma.tab_registroxevento
    .update({
      where: {
        id_evento_id_colaborador: {
          id_colaborador: result.data.id_colaborador,
          id_evento: result.data.id_evento,
        },
      },
      data: {
        asistencia: true,
      },
    })
    .then(() => res.status(200).json({ message: "Asistance updated" }))
    .catch((err) => console.log(err) && res.status(400).json(err));
};
