import { Router } from "express";
import * as authController from "../controllers/auth.js";
import { auth } from "../middlewares/auth.js";

export const authRouter = Router();

authRouter.post("/registration", authController.registration);
authRouter.post("/connection", authController.connection);
authRouter.post("/disconnect", auth, authController.disconnect);
authRouter.get("/me", auth, authController.me);
