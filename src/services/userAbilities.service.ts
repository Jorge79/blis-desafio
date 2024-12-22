import { PrismaClient } from '@prisma/client';
import { UserAbility } from '../../types/userAbilities';

export class UserAbilitiesService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create({ user_id, ability_id, years_experience }: UserAbility) {
    const user = await this.prisma.users.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const ability = await this.prisma.abilities.findUnique({
      where: { id: ability_id },
    });

    if (!ability) {
      throw new Error('Habilidade não encontrada');
    }

    if (!ability.active) {
      throw new Error('Habilidade está inativa e não pode ser atribuída');
    }

    if (years_experience < 0) {
      throw new Error('Anos de experiência não pode ser negativo');
    }

    try {
      return await this.prisma.usersAbilities.create({
        data: {
          user_id,
          ability_id,
          years_experience,
        },
        select: {
          id: true,
          years_experience: true,
          created_at: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
          ability: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async delete(user_id: string, abilities_ids: string[]) {
    const user = await this.prisma.users.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const row = await this.prisma.usersAbilities.deleteMany({
      where: {
        AND: [{ user_id }, { ability_id: { in: abilities_ids } }],
      },
    });

    if (row.count === 0) {
      throw new Error('Habilidades não encontradas para remoção');
    }

    return { message: 'Habilidades removidas com sucesso' };
  }
}
