import { pool } from "../db.js";

export const addUserInMatch = async (utilisateur_id, rencontre_id) => {
  await pool.query(
    `INSERT INTO inscription (utilisateur_id, rencontre_id) 
        VALUES ($1, $2)`,
    [utilisateur_id, rencontre_id],
  );
};

export const getMatchsByUserId = async (utilisateur_id) => {
  const result = await pool.query(
    `SELECT rencontre.*
        FROM rencontre
        JOIN inscription ON inscription.rencontre_id = rencontre.id
        WHERE inscription.utilisateur_id = $1`,
    [utilisateur_id],
  );
  return result.rows;
};
