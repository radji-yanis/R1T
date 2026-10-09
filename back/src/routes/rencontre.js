import express from 'express';
import { pool } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ 
    success: true, 
    message: "Bienvenue sur l'API des rencontres !" 
  });
});

router.get("/all", async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM rencontre;`
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

export default router;