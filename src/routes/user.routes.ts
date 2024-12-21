import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const userController = new UserController();

router.get('/users', authMiddleware, (req, res) =>
  userController.listAll(req, res),
);

router.get('/users/:id', authMiddleware, (req, res) =>
  userController.listUser(req, res),
);

router.post('/users', (req, res) => userController.create(req, res));

export default router;
