import express from "express";

import * as inscriptionController from "../controllers/inscription.js";

const router = express.Router();

router.post("/:id", inscriptionController.addUserInMatch);
router.get("/utilisateur/:id", inscriptionController.getMatchsByUserId);

export default router;
