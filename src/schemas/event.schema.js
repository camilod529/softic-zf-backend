import { number, object, string } from "zod";

const eventSchema = object({
  id_evento: number(),
  nombre_evento: string(),
  descripcion_evento: string(),
  foto_evento: string().url(),
  fecha_evento: string().datetime(),
  aforo_maximo: number(),
  aforo_registrado: number(),
  puntos_colaborador: number(),
  puntos_empresa: number(),
  puntos_castigo: number(),
});

export const validateEventSchema = (event) => eventSchema.safeParse(event);

export const validateEventSchemaUpdate = (event) =>
  eventSchema.partial().safeParse(event);
