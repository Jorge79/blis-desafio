import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(req: Request, res: Response) {
    try {
      const loginResult = await this.authService.login(req.body);
      res.status(200).json({
        message: 'Login realizado com sucesso',
        ...loginResult,
      });
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(401).json({
        error: 'Falha na autenticação',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }
}
