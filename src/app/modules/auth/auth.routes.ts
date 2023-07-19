import express from 'express';
import { AuthUserController } from './auth.controller';

const router = express.Router();

router.post('/signup', AuthUserController.createAuthUser);
router.post('/login', AuthUserController.userLogin);
router.post('/refresh-token', AuthUserController.refreshToken);

export const AuthUserRoutes = router;
