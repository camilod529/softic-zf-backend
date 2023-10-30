export const verifyAdmin = (req, res, next) => {
  if (req.decoded.rol === 1) next();
  else
    res
      .status(403)
      .json({ message: "You don't have permission to access this resource" });
};

export const verifyCompany = (req, res, next) => {
  if (req.decoded.rol in [1, 2]) next();
  else
    res
      .status(403)
      .json({ message: "You don't have permission to access this resource" });
};

export const verifyColaborator = (req, res, next) => {
  if (req.decoded.rol in [1, 2, 3]) next();
  else
    res
      .status(403)
      .json({ message: "You don't have permission to access this resource" });
};
