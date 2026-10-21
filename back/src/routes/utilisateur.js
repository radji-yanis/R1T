import express from "express";

import * as utilisateurController from "../controllers/utilisateur.js"

const router = express.Router();

router.get("/:id", utilisateurController.getById);
router.put("/:id", utilisateurController.updateById);

export default router;  