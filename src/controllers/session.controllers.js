import { prisma } from "../db/prisma.js";
import { generateToken } from "../jwt/jwt.js";

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(403).json({ message: "Fields are missing" });

    // Create request for search user

    try {
    } catch (err) {
        return res.status(400).json({ message: err });
    }
};
