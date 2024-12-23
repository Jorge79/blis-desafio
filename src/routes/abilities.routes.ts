import { Router } from 'express';
import { AbilitiesController } from '../controllers/abilities.controller';

const router = Router();
const abilitiesController = new AbilitiesController();

router.post('/abilities', (req, res) => abilitiesController.create(req, res));

router.get('/abilities', (req, res) => abilitiesController.listAll(req, res));

router.put('/abilities/:id', (req, res) =>
  abilitiesController.update(req, res),
);

export default router;
