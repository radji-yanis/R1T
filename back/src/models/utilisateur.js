import { pool } from "../db.js";

const PUBLIC_COLUMNS = "id, pseudo, email";

export const getById = async (id) => {
  const { rows } = await pool.query(
    `SELECT utilisateur.id, pseudo, avatar_id, style, email
       FROM utilisateur
       WHERE id = $1`,
    [id],
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

export async function findByEmail(email) {
  const { rows } = await pool.query(
    `SELECT ${PUBLIC_COLUMNS}, mot_de_passe_hash FROM utilisateur WHERE email = $1`,
    [email],
  );
  return rows[0] ?? null;
}

export async function findById(id) {
  const { rows } = await pool.query(
    `SELECT ${PUBLIC_COLUMNS} FROM utilisateur WHERE id = $1`,
    [id],
  );
  return rows[0] ?? null;
}

export async function create({
  email,
  pseudo,
  play_style,
  avatar_id,
  hashedPassword,
}) {
  const { rows } = await pool.query(
    `INSERT INTO utilisateur (email, pseudo, style, avatar_id, mot_de_passe_hash)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING ${PUBLIC_COLUMNS}`,
    [email, pseudo, play_style, avatar_id, hashedPassword],
  );
  return rows[0];
}
