import { pool } from "../db.js";

export const getById = async (id) => {
    const { rows } = await pool.query(
        `SELECT rencontre.id, rencontre.titre, rencontre.description, rencontre.lieu, rencontre.date_heure, rencontre.format, rencontre.statut, 
        COUNT(inscription.utilisateur_id) AS nb_inscrits
        FROM rencontre
        LEFT JOIN inscription ON rencontre.id = inscription.rencontre_id
        WHERE rencontre.id = $1
        GROUP BY rencontre.id`,
        [id],
    );

    return rows[0] ?? null;
};

export const getInscritsById = async(id) =>{
    const { rows } = await pool.query(
       `SELECT utilisateur.id, utilisateur.pseudo, utilisateur.avatar_id
         FROM inscription
         JOIN utilisateur ON utilisateur.id = inscription.utilisateur_id
         WHERE inscription.rencontre_id = $1
         ORDER BY inscription.date_inscription`,
        [id],
      );

      return rows ?? null;
};

export const cancelById = async (id) => {
    const { rows } = await pool.query(
        `UPDATE rencontre
         SET statut = 'annulee'
         WHERE id = $1 AND statut != 'annulee'
         RETURNING *`,
        [id],
    );

    return rows[0] ?? null;
};

export const create = async (titre, lieu, format, date_heure, description, organisateur_id, latitude, longitude) => {
    const { rows } = await pool.query(
        `INSERT INTO rencontre (titre, lieu, format, date_heure, description, organisateur_id, latitude, longitude)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING *`,
        [titre, lieu, format, date_heure, description, organisateur_id, latitude, longitude],
    );

    return rows[0];
};