import { object, number, string, boolean } from "zod";

const awardSchema = object({
  nombre_premio: string(),
  detalles_premio: string(),
  coste_premio: number().min(0),
});

const reclaimAwardSchema = object({
  id_reclamo: number(),
  id_premio: number(),
  id_reclamante: string(),
});

const coste_premioSchema = number().min(0);
const estado_premioSchema = boolean();

export const validateAwardSchema = (award) => awardSchema.safeParse(award);

export const validateCoste_premio = (coste_premio) =>
  coste_premioSchema.safeParse(coste_premio);

export const validateEstado_premio = (estado_premio) =>
  estado_premioSchema.safeParse(estado_premio);

export const validateReclaimAwardSchema = (reclaimAward) =>
  reclaimAwardSchema.safeParse(reclaimAward);
