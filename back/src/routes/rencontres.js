import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { dateDebut, dateFin, format } = req.query;
    const validFormats = ["foot5", "foot7", "foot11"];

    if (format && !validFormats.includes(format)) {
      return res.status(400).json({
        error: "Invalid match format",
      });
    }

    const isValidDate = (date) => {
      if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return false;
      }

      const parsedDate = new Date(`${date}T00:00:00Z`);
      return (
        !Number.isNaN(parsedDate.getTime()) &&
        parsedDate.toISOString().slice(0, 10) === date
      );
    };

    if (
      (dateDebut && !isValidDate(dateDebut)) ||
      (dateFin && !isValidDate(dateFin))
    ) {
      return res.status(400).json({
        error: "Invalid date format",
      });
    }

    let query = `
      SELECT 
        rencontre.*, 
        COALESCE(inscrits.nb_inscrits, 0) AS nb_inscrits
      FROM rencontre
      LEFT JOIN (
        SELECT
          rencontre_id,
          COUNT(*) AS nb_inscrits
        FROM inscription
        GROUP BY rencontre_id
      ) AS inscrits
        ON rencontre.id = inscrits.rencontre_id
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

    const { rows } = await pool.query(query, params);

    res.json(rows);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const matchId = Number(req.params.id);

    if (!Number.isSafeInteger(matchId) || matchId <= 0) {
      return res.status(400).json({ error: "Invalid match ID" });
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

router.post("/create", async (req, res, next) => {
  try {
    const { titre, lieu, format, date_heure, description, organisateur_id, latitude, longitude } = req.body;

    const lat = Number(latitude);
    const lng = Number(longitude);
    const validFormats = ["foot5", "foot7", "foot11"];

    if (!titre || titre.trim().length < 3) {
      return res.status(400).json({ error: "Title is required and must be at least 3 characters long." });
    }

    if (!lieu || !lieu.trim()) {
      return res.status(400).json({ error: "Location is required." });
    }

    if (!format || !validFormats.includes(format)) {
      return res.status(400).json({ error: "Invalid format. Accepted values: 5v5, 7v7, 11v11." });
    }

    if (!date_heure || Number.isNaN(Date.parse(date_heure))) {
      return res.status(400).json({ error: "Invalid date or time." });
    }

    if (!organisateur_id || !Number.isInteger(Number(organisateur_id))) {
      return res.status(400).json({ error: "Organizer ID must be a valid integer." });
    }

    if (!latitude || Number.isNaN(lat) || lat < -90 || lat > 90) {
      return res.status(400).json({ error: "Invalid latitude. Must be between -90 and 90." });
    }

    if (!longitude || Number.isNaN(lng) || lng < -180 || lng > 180) {
      return res.status(400).json({ error: "Invalid longitude. Must be between -180 and 180." });
    }

    const { rows } = await pool.query(
      `INSERT INTO rencontre (titre, lieu, format, date_heure, description, organisateur_id, latitude, longitude)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [titre.trim(), lieu.trim(), format, date_heure, description || null, organisateur_id, lat, lng]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
});

export default router;
