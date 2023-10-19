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

const checkColaborator = async (nick, res) => {
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
      edad,
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
    // contrasena = crypto.createHash("md5").update(req.body.contrasena).digest("hex");

    const user = await prisma.tab_usuario.findUnique({
      where: {
        nick,
        contrasena,
        estado: true,
      },
    });

    console.log(user);

    if (!user) return res.status(404).json({ message: "Invalid credentials" });

    switch (user.rol) {
      case 1: {
        res.status(200).json({ token: generateToken(user), data: user });
        break;
      }

      case 2: {
        console.log("company");
        checkCompany(nick, res);
        break;
      }

      case 3: {
        console.log("colaborator");
        checkColaborator(nick, res);
        break;
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
};
