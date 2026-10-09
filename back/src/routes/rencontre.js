import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json({
    success: true,
    message: "Bienvenue sur l'API des rencontres !",
  });
});

router.get("/all", async (req, res, next) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM rencontre;`);
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    if (!Number(req.params.id)) {
      return res.status(400).json({ error: "Invalid match id" })
      
    }
   
    const { rows } = await pool.query(
      `SELECT id, titre, description, lieu, date_heure, format, statut
       FROM rencontre
       WHERE id = $1`,
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Match not found" });
    }

    
    const { rows: inscrits } = await pool.query(
      `SELECT utilisateur.pseudo, utilisateur.avatar_id
       FROM inscription
       JOIN utilisateur ON utilisateur.id = inscription.utilisateur_id
       WHERE inscription.rencontre_id = $1
       ORDER BY inscription.date_inscription`,
      [req.params.id]
    );

  
    res.json({ ...rows[0], inscrits });
  } catch (err) {
    next(err);
  }
});

export default router;
