import { UserController } from './../controllers/user.controller';
import express from 'express';

const router = express.Router();
const userController = new UserController();

router.get('/users', (req, res) => userController.list(req, res));
router.get('/users:id', (req, res) => userController.listAll(req, res));

router.post('/users', (req, res) => userController.create(req, res));

export default router;
