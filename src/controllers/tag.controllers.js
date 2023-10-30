import { prisma } from "../db/prisma.js";
import {
  validateTagSchema,
  validateTagSchemaUpdate,
} from "../schemas/tag.schema.js";

export const getTags = async (req, res) => {
  await prisma.tab_etiqueta
    .findMany({
      where: {
        estado_etiqueta: true,
      },
    })
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json({ message: err }));
};

export const getTag = async (req, res) => {
  await prisma.tab_etiqueta
    .findUnique({
      where: {
        id_etiqueta: parseInt(req.params.id_etiqueta),
        estado_etiqueta: true,
      },
    })
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json({ message: err }));
};

export const createTag = async (req, res) => {
  let result = validateTagSchema(req.body);

  if (!result.success) return res.status(403).json(result.error);

  await prisma.tab_etiqueta
    .create({
      data: result.data,
    })
    .then(() => res.status(201).json({ message: "Tag created" }))
    .catch((err) => console.log(err) && res.status(400).json({ message: err }));
};

export const updateTag = async (req, res) => {
  let result = validateTagSchemaUpdate(req.body);

  if (!result.success) return res.status(403).json(result.error);

  await prisma.tab_etiqueta
    .update({
      where: {
        id_etiqueta: parseInt(req.params.id_etiqueta),
      },
      data: result.data,
    })
    .then(() => res.status(200).json({ message: "Tag updated" }))
    .catch((err) => console.log(err) && res.status(400).json({ message: err }));
};

export const setTagsToColaborator = async (req, res) => {
  try {
    const tags = req.body.tags;

    await prisma.tab_usuario.update({
      where: {
        nick: req.decoded.documento_colaborador,
      },
      data: {
        pirmeravez: false,
      },
    });

    await prisma.tab_etiquetasxcolaborador.deleteMany({
      where: {
        id_colaborador: req.decoded.documento_colaborador,
      },
    });

    for (let i = 0; i < tags.length; i++) {
      await prisma.tab_etiquetasxcolaborador.create({
        data: {
          id_colaborador: req.decoded.documento_colaborador,
          id_etiqueta: tags[i],
        },
      });
    }

    res.status(200).json({ message: "Tags setted" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export const getTagsToColaborator = async (req, res) => {
  try {
    const etiquetasxcolaboador = await prisma.tab_etiquetasxcolaborador
      .findMany({
        where: {
          id_colaborador: req.decoded.documento_colaborador,
        },
      })
      .then((data) => data.map((item) => item.id_etiqueta));

    const etiquetas = await prisma.tab_etiqueta.findMany({
      where: {
        id_etiqueta: {
          in: etiquetasxcolaboador,
        },
      },
    });

    res.status(200).json(etiquetas);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
