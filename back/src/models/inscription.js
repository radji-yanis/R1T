import { pool } from "../db.js";

export const addUserInMatch = async (utilisateur_id, rencontre_id) => {
    await pool.query(
        `INSERT INTO inscription_rencontre (utilisateur_id, rencontre_id) 
        VALUES ($1, $2)`,
        [utilisateur_id, rencontre_id],
    );
};