import { number, object, string } from "zod";

const registerToEventSchema = object({
  id_evento: number(),
  id_colaborador: string(),
  referido_por: string().optional(),
});

export const validateRegisterToEventSchema = (registerToEvent) =>
  registerToEventSchema.safeParse(registerToEvent);

export const validateRegisterToEventSchemaUpdate = (registerToEvent) =>
  registerToEventSchema.partial().safeParse(registerToEvent);
