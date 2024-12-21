import { PrismaClient, UserDocuments } from '@prisma/client';
import { ICreateUserDocumentDTO } from '../types/userDocument';

class UserDocumentService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: ICreateUserDocumentDTO): Promise<UserDocuments> {
    const userExists = await this.prisma.users.findUnique({
      where: { id: data.user_id },
    });

    if (!userExists) {
      const error = new Error('Usuário não encontrado');
      error.name = 'NotFoundError';
      throw error;
    }

    try {
      const userDocument = await this.prisma.userDocuments.create({
        data: {
          name: data.name,
          url: data.url,
          user_id: data.user_id,
        },
      });

      return userDocument;
    } catch (error) {
      const serviceError = new Error('Erro ao criar documento do usuário');
      serviceError.name = 'ServiceError';
      throw serviceError;
    }
  }

  async listUserDocuments(userId: string): Promise<UserDocuments[]> {
    try {
      const documents = await this.prisma.userDocuments.findMany({
        where: { user_id: userId },
      });

      return documents;
    } catch (error) {
      const serviceError = new Error('Erro ao buscar documentos do usuário');
      serviceError.name = 'ServiceError';
      throw serviceError;
    }
  }
}

export default new UserDocumentService();
