import { Abilities } from '../../types/abilities';
import { PrismaClient } from '@prisma/client';

export class AbilitiesService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create({ name }: Abilities) {
    const abilityExists = await this.prisma.abilities.findFirst({
      where: { name },
    });

    if (abilityExists) {
      throw new Error('Habilidade já cadastrada');
    }

    const ability = await this.prisma.abilities.create({
      data: {
        name,
        active: true,
      },
    });

    return ability;
  }

  async listAbilities(): Promise<Abilities[]> {
    return await this.prisma.abilities.findMany({
      select: {
        id: true,
        name: true,
        active: true,
        created_at: true,
      },
    });
  }
}
