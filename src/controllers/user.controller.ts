import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async create(req: Request, res: Response) {
    try {
      const newUser = await this.userService.createUser(req.body);
      res.status(201).json({
        message: 'Usuário criado com sucesso',
        user: newUser,
      });
    } catch (error) {
      console.error('Erro na criação de usuário:', error);
      res.status(400).json({
        error: 'Erro na criação de usuário',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  async listAll(req: Request, res: Response) {
    try {
      const users = await this.userService.listUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      res.status(500).json({
        error: 'Erro interno do servidor',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  async listUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const user = await this.userService.getUserById(userId);

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({
        error: 'Erro interno do servidor',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }
}
