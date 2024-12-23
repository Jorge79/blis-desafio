import express from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = express.Router();
const authController = new AuthController();

router.post('/users/login', (req, res) => authController.login(req, res));

export default router;
