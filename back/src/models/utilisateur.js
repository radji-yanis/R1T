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