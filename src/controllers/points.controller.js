import { prisma } from "../db/prisma.js";

export const getPointsCount = async (req, res) => {
  const { rol } = req.decoded;
  const { nick } = req.query;

  switch (rol) {
    case 2:
      await prisma.tab_empresa
        .findUnique({
          where: {
            nit: nick,
          },
        })
        .then((data) => res.status(200).json({ puntos: data.puntos }))
        .catch((err) => res.status(400).json({ message: err }));

      break;

    case 3:
      await prisma.tab_colaborador
        .findUnique({
          where: {
            documento_colaborador: nick,
          },
        })
        .then((data) =>
          res.status(200).json({ puntos_acumulados: data.puntos_acumulados })
        )
        .catch((err) => res.status(400).json({ message: err }));
      break;

    default:
      res.status(400).json({ message: "Admins don't have points" });
      break;
  }
};
