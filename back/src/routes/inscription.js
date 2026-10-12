import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.post("/:id", async (req, res, next) => {
  try {
    const { utilisateur_id } = req.body;
    const { rows } = await pool.query(
      `SELECT rencontre.format, rencontre.statut, rencontre.date_heure,
          COUNT(inscription.utilisateur_id) AS nb_inscrits
       FROM rencontre
       LEFT JOIN inscription ON inscription.rencontre_id = rencontre.id
       WHERE rencontre.id = $1
       GROUP BY rencontre.id`,
      [req.params.id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Match not found" });
    }
    if (rows[0].statut === "annulee") {
     return res.status(409).json({ error: "Match has been cancelled" });
    }

    if (rows[0].date_heure < new Date()) {
      return res.status(409).json({ error: "Match is already over" });
    }
    let places;
    if (rows[0].format === "foot5") {
      places = 10;
    } else if (rows[0].format === "foot7") {
      places = 14;
    } else {
      places = 22;
    }
    if (places <= Number(rows[0].nb_inscrits)) {
      return res.status(409).json({ error: "Match is full" });
    }

    await pool.query(
      `INSERT INTO inscription (utilisateur_id, rencontre_id) 
        VALUES ($1, $2)`,
      [utilisateur_id, req.params.id],
    );

    return res.status(201).json({ message: "Registration confirmed" });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "Already registered" });
    }
    next(err);
  }
});

export default router;
