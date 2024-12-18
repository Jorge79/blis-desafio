import { createUserSchema } from './../validators/user.validator';
import { PrismaClient, Users } from '@prisma/client';
import bcrypt from 'bcryptjs';
import User from '../interfaces/User';

export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(User): Promise<Partial<Users>> {
    const { error } = createUserSchema.validate(User);

    if (error) {
      throw new Error(error.details[0].message);
    }

    const existingUser = await this.prisma.users.findUnique({
      where: { email: User.email },
    });

    if (existingUser) {
      throw new Error('Usuário com este email já existe');
    }

    const criptoPassword = await bcrypt.hash(User.password, 10);

    const newUser = await this.prisma.users.create({
      data: {
        name: User.name,
        email: User.email,
        password: criptoPassword,
        birthdate: new Date(User.birthdate),
      },
      select: {
        id: true,
        name: true,
        email: true,
        birthdate: true,
        created_at: true,
      },
    });

    return newUser;
  }

  async listUsers(): Promise<Partial<Users>[]> {
    return await this.prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        birthdate: true,
      },
    });
  }

  async getUserById(userId: string): Promise<Partial<Users>> {
    return await this.prisma.users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        birthdate: true,
      },
    });
  }
}
