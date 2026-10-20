import express from "express";
import { pool } from "../db.js";
import * as rencontreController from "../controllers/rencontre.js";

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

router.get("/:id", rencontreController.getById);



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

router.put("/:id/cancel", async (req, res, next) => {
  try {
    const { id } = req.params;

      if (!Number(id)) {
      return res.status(400).json({ error: "Invalid match id" });
    }

    const { rows, rowCount } = await pool.query(
      `UPDATE rencontre 
       SET statut = 'annulee' 
       WHERE id = $1 AND statut != 'annulee'
       RETURNING *`,
      [id]
    );

    if (rowCount === 0) {
      return res.status(404).json({ error: "Match not found or already cancelled" });
    }

    res.json({ message: "Match cancelled successfully", match: rows[0] });
  } catch (err) {
    next(err);
  }
});


export default router;
