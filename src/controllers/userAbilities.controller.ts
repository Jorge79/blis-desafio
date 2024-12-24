import { Request, Response } from 'express';
import { UserAbilitiesService } from '../services/userAbilities.service';

export class UserAbilitiesController {
  private userAbilitiesService: UserAbilitiesService;

  constructor() {
    this.userAbilitiesService = new UserAbilitiesService();
  }

  async create(req: Request, res: Response) {
    try {
      const { user_id, ability_id, years_experience } = req.body;

      if (!user_id || !ability_id || years_experience === undefined) {
        return res.status(400).json({
          error: 'Todos os campos são obrigatórios',
        });
      }

      const userAbility = await this.userAbilitiesService.create({
        user_id,
        ability_id,
        years_experience: Number(years_experience),
      });

      return res.status(201).json(userAbility);
    } catch (error) {
      return res.status(400).json({
        error:
          error instanceof Error
            ? error.message
            : 'Erro ao criar relação usuário-habilidade',
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { user_id, abilities_ids } = req.body;

      if (!user_id) {
        return res.status(400).json({
          error: 'ID do usuário é obrigatório',
        });
      }

      if (!abilities_ids || !Array.isArray(abilities_ids)) {
        return res.status(400).json({
          error: 'É necessário fornecer um array de IDs de habilidades',
        });
      }

      if (abilities_ids.length === 0) {
        return res.status(400).json({
          error: 'É necessário fornecer ao menos uma habilidade para remover',
        });
      }

      await this.userAbilitiesService.delete(user_id, abilities_ids);

      return res.status(200).json({
        message: 'Uma ou mais habilidades removidas com sucesso',
      });
    } catch (error) {
      console.error('Erro ao remover habilidades:', error);
      return res.status(400).json({
        error:
          error instanceof Error
            ? error.message
            : 'Erro ao remover habilidades',
      });
    }
  }

  async listAll(req: Request, res: Response) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      if (page < 1) {
        return res.status(400).json({
          error: 'O número da página deve ser maior que zero',
        });
      }

      if (limit < 1) {
        return res.status(400).json({
          error: 'O limite por página deve ser maior que zero',
        });
      }

      const result = await this.userAbilitiesService.listUsersAbilities(
        page,
        limit,
      );

      return res.status(200).json(result);
    } catch (error) {
      console.error('Erro ao listar habilidades dos usuários:', error);
      return res.status(500).json({
        error:
          error instanceof Error ? error.message : 'Erro interno do servidor',
      });
    }
  }
}
