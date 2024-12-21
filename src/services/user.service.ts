import { PrismaClient, Users } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { createUserSchema } from '../validators/user.validator';
import User from '../../types/user';

export class UserService {
  private prisma: PrismaClient;
  private readonly salt: number;

  constructor() {
    this.prisma = new PrismaClient();
    this.salt = Number(process.env.BCRYPT_SALT);
  }

  async createUser(user: User): Promise<Partial<Users>> {
    const { error } = createUserSchema.validate(user);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const existingUser = await this.prisma.users.findUnique({
      where: { email: user.email },
    });

    if (existingUser) {
      throw new Error('Usuário com este email já existe');
    }

    const hashedPassword = await bcrypt.hash(user.password, this.salt);

    const newUser = await this.prisma.users.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        birthdate: new Date(user.birthdate),
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

  async getUserById(userId: string): Promise<Partial<Users> | null> {
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
