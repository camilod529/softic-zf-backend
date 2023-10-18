import { prisma } from "../db/prisma.js";
import { validateCommentSchema } from "../schemas/comment.schema.js";

export const getComments = async (req, res) => {
  await prisma.tab_comentario
    .findMany()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
};

export const createComment = async (req, res) => {
  let result = validateCommentSchema(req.body);

  if (!result.success) return res.status(403).json(result.error);

  await prisma.tab_comentario
    .create({
      data: result.data,
    })
    .then(() => res.status(201).json({ message: "Comentario creado" }))
    .catch((err) => console.log(err) && res.status(400).json(err));
};
