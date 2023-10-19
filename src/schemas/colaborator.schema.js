import { object, number, string } from "zod";

const colaboratorSchema = object({
  documento_colaborador: string(),
  empresa_colaborador: string(),
  nombre_1: string(),
  nombre_2: string().optional(),
  apellido_1: string(),
  apellido_2: string().optional(),
  genero: string(),
  correo_empresarial: string().email().optional(),
  correo_personal: string().email(),
  fecha_nacimiento: string().datetime(),
});

export const validateColaboratorSchema = (colaborator) =>
  colaboratorSchema.safeParse(colaborator);

export const validateColaboratorSchemaUpdate = (colaborator) =>
  colaboratorSchema.partial().safeParse(colaborator);
