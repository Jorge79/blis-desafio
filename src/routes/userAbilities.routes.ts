import { Router } from 'express';
import { UserAbilitiesController } from '../controllers/userAbilities.controller';

const router = Router();
const userAbilitiesController = new UserAbilitiesController();

router.post('/users/abilities', (req, res) =>
  userAbilitiesController.create(req, res),
);

router.delete('/users/abilities', (req, res) =>
  userAbilitiesController.delete(req, res),
);

router.get('/users/abilities', (req, res) =>
  userAbilitiesController.listAll(req, res),
);

export default router;
