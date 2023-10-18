import { validateColaboratorSchema } from "../schemas/colaborator.schema.js";

export const createColaborator = async (req, res) => {
  let result = validateColaboratorSchema(req.body);

  if (!result.success) return res.status(403).json(result.error);

  try {
    const colaborator = await prisma.tab_colaborador.create({
      data: {
        documento_colaborador: result.data.documento_colaborador,
        empresa_colaborador: result.data.empresa_colaborador,
        nombre_1: result.data.nombre_1,
        nombre_2: result.data.nombre_2 || null,
        apellido_1: result.data.apellido_1,
        apellido_2: result.data.apellido_2 || null,
        genero: result.data.genero,
        correo_empresarial: result.data.correo_empresarial,
        correo_personal: result.data.correo_personal,
        fecha_nacimiento: result.data.fecha_nacimiento,
        foto: result.data.foto,
      },
    });

    res.status(201).json({ message: "Colaborator created" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
