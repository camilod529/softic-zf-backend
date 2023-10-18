import { number, object, string } from "zod";

const tagSchema = object({
  id_etiqueta: number(),
  nombre_etiqueta: string(),
  descripcion_etiqueta: string()
});

export const validateTagSchema = (tag) => tagSchema.safeParse(tag);

export const validateTagSchemaUpdate = (tag) =>
  tagSchema.partial().safeParse(tag);
