import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { dateDebut, dateFin, format } = req.query;
    let query = `
      SELECT 
        rencontre.*, 
        COUNT(inscription.utilisateur_id) AS nb_inscrits
      FROM rencontre
      LEFT JOIN inscription ON rencontre.id = inscription.rencontre_id
      WHERE rencontre.statut != 'annulee'
    `;
    const params = [];

    if (dateDebut) {
      params.push(dateDebut);
      query += ` AND rencontre.date_heure >= $${params.length}::date`;
    }
    if (dateFin) {
      params.push(dateFin);
      query += ` AND rencontre.date_heure < ($${params.length}::date + INTERVAL '1 day')`;
    }

    if (format) {
      params.push(format);
      query += ` AND rencontre.format = $${params.length}`;
    }

    query += ` GROUP BY rencontre.id`;

    const { rows } = await pool.query(query, params);

    res.json(rows);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    if (!Number(req.params.id)) {
      return res.status(400).json({ error: "Invalid match id" });
    }

    const { rows } = await pool.query(
      `SELECT rencontre.id, rencontre.titre, rencontre.description, rencontre.lieu, rencontre.date_heure, rencontre.format, rencontre.statut, 
        COUNT(inscription.utilisateur_id) AS nb_inscrits
        FROM rencontre
        LEFT JOIN inscription ON rencontre.id = inscription.rencontre_id
        WHERE rencontre.id = $1
        GROUP BY rencontre.id`,
      [req.params.id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Match not found" });
    }

    const { rows: inscrits } = await pool.query(
      `SELECT utilisateur.id, utilisateur.pseudo, utilisateur.avatar_id
       FROM inscription
       JOIN utilisateur ON utilisateur.id = inscription.utilisateur_id
       WHERE inscription.rencontre_id = $1
       ORDER BY inscription.date_inscription`,
      [req.params.id],
    );

    res.json({ ...rows[0], inscrits });
  } catch (err) {
    next(err);
  }
});

export default router;
