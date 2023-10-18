import { object, number, string, boolean } from "zod";

const awardSchema = object({
  id_premio: number(),
  nombre_premio: string(),
  detalles_premio: string(),
  coste_premio: number().min(0),
  estado_premio: boolean(),
});

const coste_premio = number().min(0);
const estado_premio = boolean();

export const validateAwardSchema = (award) => awardSchema.safeParse(award);

export const validateCoste_premio = (coste_premio) =>
  coste_premio.safeParse(coste_premio);

export const validateEstado_premio = (estado_premio) =>
  estado_premio.safeParse(estado_premio);
