import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import userDocumentRoutes from './routes/userDocument.routes';
import abilitiesRoutes from './routes/abilities.routes';
import 'dotenv/config';

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

  app.use(express.json());

  const uploadsDir = createUploadsDirectory();

  app.use('/uploads', express.static(uploadsDir));

  app.use(userRoutes);
  app.use(authRoutes);
  app.use(userDocumentRoutes);
  app.use(abilitiesRoutes);

  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
};

startServer().catch(console.error);
