import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import userDocumentRoutes from './routes/userDocument.routes';
import 'dotenv/config';

// Obter __dirname equivalente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createUploadsDirectory = () => {
  const uploadDir = path.resolve(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  return uploadDir;
};

const startServer = async () => {
  const app = express();
  const port = process.env.PORT || 3000;

  // Middleware
  app.use(express.json());

  // Criar diretório de uploads se não existir
  const uploadsDir = createUploadsDirectory();

  // Static files
  app.use('/uploads', express.static(uploadsDir));

  // Routes
  app.use(userRoutes);
  app.use(authRoutes);
  app.use(userDocumentRoutes);

  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
};

startServer().catch(console.error);
