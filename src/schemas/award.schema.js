import { object, number, string } from "zod";

const awardSchema = object({
  id_premio: number(),
  nombre_premio: string(),
  detalles_premio: string(),
  coste_premio: number(),
  estado_premio: string(),
});

export const validateAwardSchema = (award) => awardSchema.safeParse(award);
