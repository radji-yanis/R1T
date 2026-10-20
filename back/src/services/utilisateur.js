import * as utilisateurModel from "../models/utilisateur.js"

export const getById = async (id) => {
    if (!Number(id)) throw new Error("Invalid user ID");

    const user = await utilisateurModel.getById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
}