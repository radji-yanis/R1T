import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.get("/:id", async (req, res, next) => {
  try {
    
    if (!Number(req.params.id)) {
        return res.status(400).json({ error: " Invalid User ID " });
        
    }

   
    const { rows } = await pool.query(
      `SELECT utilisateur.id, pseudo, avatar_id, style, email
       FROM utilisateur
       WHERE id = $1`,
      [req.params.id]
    );

    
    if (rows.length === 0) {
        return res.status(404).json({ error: "User not found" });
}

    
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

export default router;