import { Request, Response } from 'express';
import { AbilitiesService } from '../services/abilities.service';

export class AbilitiesController {
  private abilitiesService: AbilitiesService;

  constructor() {
    this.abilitiesService = new AbilitiesService();
  }

  async create(req: Request, res: Response) {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }

      const ability = await this.abilitiesService.create({ name });

      return res.status(201).json(ability);
    } catch (error) {
      return res.status(400).json({
        error:
          error instanceof Error ? error.message : 'Error creating ability',
      });
    }
  }

  async listAll(req: Request, res: Response) {
    try {
      const abilities = await this.abilitiesService.listAbilities();
      res.status(200).json(abilities);
    } catch (error) {
      console.error('Erro ao listar habilidades:', error);
      res.status(500).json({
        error: 'Erro interno do servidor',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { active } = req.body;

      if (typeof active !== 'boolean') {
        return res
          .status(400)
          .json({ error: 'O campo active deve ser um booleano' });
      }

      const updatedAbility = await this.abilitiesService.update(id, active);
      return res.status(200).json(updatedAbility);
    } catch (error) {
      return res.status(400).json({
        error:
          error instanceof Error
            ? error.message
            : 'Erro ao atualizar habilidade',
      });
    }
  }
}
