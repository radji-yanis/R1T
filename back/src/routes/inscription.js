import express from "express";

import * as inscriptionController from "../controllers/inscription.js"

const router = express.Router();

router.post("/:id", inscriptionController.addUserInMatch)

export default router;
