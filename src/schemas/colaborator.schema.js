import { object, number, string } from "zod";

const colaboratorSchema = object({
  documento_colaborador: number().positive(),
  empresa_colaborador: number().positive(),
  nombre_1: string(),
  nombre_2: string().optional(),
  apellido_1: string(),
  apellido_2: string().optional(),
  genero: string(),
  correo_empresarial: string().email(),
  correo_personal: string().email(),
  fecha_nacimiento: string().datetime(),
  foto: string().url(),
});

export const validateColaboratorSchema = (colaborator) =>
  colaboratorSchema.safeParse(colaborator);
