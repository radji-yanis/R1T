import { pool } from "../db.js";

export const getById = async (id) => {
    const { rows } = await pool.query(
      `SELECT utilisateur.id, pseudo, avatar_id, style, email
       FROM utilisateur
       WHERE id = $1`,
      [id]
    );

    return rows[0] ?? null;
};

export const updateById = async (id, pseudo, email, style, avatar_id) => {
    const { rows } = await pool.query(
        `UPDATE utilisateur
         SET pseudo = $2, email = $3, style = $4, avatar_id = $5
         WHERE id = $1
         RETURNING id, pseudo, avatar_id, style, email`,
        [id, pseudo, email, style, avatar_id],
    );

    return rows[0];
};