import express from "express";

import * as inscriptionController from "../controllers/inscription.js";

import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/:id", auth, inscriptionController.addUserInMatch);
router.get("/utilisateur/:id", auth, inscriptionController.getMatchsByUserId);

export default router;
