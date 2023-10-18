import { number, object, string } from "zod";

const commentSchema = object({
  id_evento: number(),
  id_comentarista: string(),
  id_comentario: number(),
  comentario: string(),
});

export const validateCommentSchema = (comment) =>
  commentSchema.safeParse(comment);
