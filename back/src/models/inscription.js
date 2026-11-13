import { pool } from "../db.js";

export const addUserInMatch = async (utilisateur_id, rencontre_id) => {
  await pool.query(
    `INSERT INTO inscription_rencontre (utilisateur_id, rencontre_id) 
        VALUES ($1, $2)`,
    [utilisateur_id, rencontre_id],
  );
};

export const getNotOrganizedMatchsByUserId = async (utilisateur_id) => {
  const result = await pool.query(
    `SELECT
      rencontre.*,
      COALESCE(inscrits.nb_inscrits, 0)::int AS nb_inscrits
    FROM inscription_rencontre ir
    JOIN rencontre
      ON rencontre.id = ir.rencontre_id
    LEFT JOIN (
      SELECT rencontre_id, COUNT(*) AS nb_inscrits
      FROM inscription_rencontre
      GROUP BY rencontre_id
    ) AS inscrits
      ON rencontre.id = inscrits.rencontre_id
    WHERE ir.utilisateur_id = $1
      AND rencontre.organisateur_id != $1
      AND rencontre.statut != 'annulee'
      AND rencontre.date_heure >= NOW()
    ORDER BY rencontre.date_heure`,
    [utilisateur_id],
  );
  return result.rows;
};
