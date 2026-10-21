import { httpError } from "../utils/httpError.js";
import * as utilisateurModel from "../models/utilisateur.js"

export const getById = async (id) => {
    if (!Number(id)) 
      throw httpError(400, "Invalid user id")

    const user = await utilisateurModel.getById(id);

    if (!user) {
      throw httpError(404, "User not found")
    }

    return user;
}


const VALID_STYLES = ["renard_surfaces", "magicien", "muraille", "dernier_rempart", "artificier"];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const updateById = async (id, pseudo, email, style, avatar_id) => {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
        throw httpError(400, "Invalid user id");
    }

    if (typeof pseudo !== "string" || !pseudo.trim() || pseudo.trim().length > 50) {
        throw httpError(400, "Pseudo is required and must be at most 50 characters long");
    }

    if (typeof email !== "string" || !EMAIL_REGEX.test(email.trim()) || email.trim().length > 255) {
        throw httpError(400, "Invalid email");
    }

    if (!VALID_STYLES.includes(style)) {
        throw httpError(400, "Invalid play style");
    }

    const avatarId = Number(avatar_id);
    if (!Number.isInteger(avatarId) || avatarId < 1 || avatarId > 30) {
        throw httpError(400, "Avatar id must be an integer between 1 and 30");
    }

    try {
        const utilisateur = await utilisateurModel.updateById(id, pseudo, email, style, avatarId);
        if (!utilisateur) {
            throw httpError(404, "User not found");
        }
        return utilisateur;
    } catch (err) {
        if (err.code === "23505") {
            throw httpError(409, "Email already used");
        }
        throw err;
    }
};