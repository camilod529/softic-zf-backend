import crypto from "crypto";

import { prisma } from "../db/prisma.js";
import { generateToken } from "../jwt/jwt.js";

const checkCompany = async (nick, res) => {
  const company = await prisma.tab_empresa.findUnique({
    where: {
      nit: nick,
    },
  });

  if (!company)
    return res
      .status(404)
      .json({ message: "There's no company with that credentials" });

  res.status(200).json({
    token: generateToken({ ...company, rol: 2 }),
    data: { ...company, rol: 2 },
  });
};

const checkColaborator = async (nick, primera_vez, res) => {
  const colaborator = await prisma.tab_colaborador.findUnique({
    where: {
      documento_colaborador: nick,
    },
  });

  if (!colaborator)
    return res
      .status(404)
      .json({ message: "There's no colaborator with that credentials" });

  colaborator.empresa_colaborador = await prisma.tab_empresa
    .findUnique({
      where: {
        nit: colaborator.empresa_colaborador,
      },
    })
    .then((data) => data.nombre_empresa);

  const etiquetasxcolaboador = await prisma.tab_etiquetasxcolaborador
    .findMany({
      where: {
        id_colaborador: colaborator.documento_colaborador,
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

  const edad =
    new Date().getFullYear() -
    new Date(colaborator.fecha_nacimiento).getFullYear();

  res.status(200).json({
    token: generateToken({
      ...colaborator,
      rol: 3,
    }),
    data: {
      ...colaborator,
      primera_vez,
      edad,
      gustos: etiquetas,
      rol: 3,
    },
  });
};

export const login = async (req, res) => {
  const nick = req.body.nick;
  let contrasena = req.body.contrasena;
  console.log(nick);

  if (!nick || !contrasena)
    return res.status(403).json({ message: "Fields are missing" });

  try {
    // Esto se debe descomentar para un futuro, ya que las contraseñas deben estar encriptadas
    // contrasena = crypto.createHash("md5").update(req.body.contrasena).digest("hex");

    const user = await prisma.tab_usuario.findUnique({
      where: {
        nick,
        contrasena,
        estado: true,
      },
    });

    if (!user) return res.status(404).json({ message: "Invalid credentials" });

    switch (user.rol) {
      case 1: {
        res.status(200).json({ token: generateToken(user), data: user });
        break;
      }

      case 2: {
        checkCompany(nick, res);
        break;
      }

      case 3: {
        checkColaborator(nick, user.pirmeravez, res);
        break;
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
};
