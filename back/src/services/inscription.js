// import * as inscriptionModel from "../models/inscription.js"

export const addUserInMatch = async (utilisateur_id, rencontre_id) => {
    if (!Number(utilisateur_id)) throw new Error("Invalid user ID");
    if (!Number(rencontre_id)) throw new Error("Invalid match ID");

    await utilisateurModel.addUserInMatch(utilisateur_id, rencontre_id);
}