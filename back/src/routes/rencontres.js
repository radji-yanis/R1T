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
router.post("/create", rencontreController.create);
router.put("/:id/cancel", rencontreController.cancelById);

export default router;
