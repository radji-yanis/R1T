import { Router } from 'express';
import * as authController from '../controllers/auth.js';

export const authRouter = Router();

authRouter.post('/registration', authController.registration);
// authRouter.post('/connexion', authController.connexion);
// authRouter.post('/deconnexion', authController.deconnexion);
// authRouter.get('/me', auth, authController.moi);
