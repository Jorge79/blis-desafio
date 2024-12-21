import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { loginSchema } from '../validators/user.validator';

export class AuthService {
  private prisma: PrismaClient;
  private readonly salt: number;

  constructor() {
    this.prisma = new PrismaClient();
    this.salt = Number(process.env.BCRYPT_SALT);
  }

  private async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async login(loginData: { email: string; password: string }) {
    const { error } = loginSchema.validate(loginData);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const user = await this.prisma.users.findUnique({
      where: { email: loginData.email },
    });

    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const isPasswordValid = await this.comparePasswords(
      loginData.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas');
    }

    const token = this.generateToken(user.id);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  private generateToken(userId: string): string {
    if (!process.env.JWT_SECRET) {
      throw new Error('Chave JWT não configurada');
    }

    return jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
  }
}
