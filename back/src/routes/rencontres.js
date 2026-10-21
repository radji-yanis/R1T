import express from "express";
import { pool } from "../db.js";
import * as rencontreController from "../controllers/rencontre.js";

const router = express.Router();

router.get("/", rencontreController.getAll);
router.get("/:id", rencontreController.getById);
router.post("/create", rencontreController.create);
router.put("/:id/cancel", rencontreController.cancelById);

export default router;
