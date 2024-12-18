import express from 'express';
import userRoutes from './routes/user.routes';
import sequelize from './config/database';
import 'dotenv/config';

const startServer = async () => {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(express.json());
  app.use('/', userRoutes);

  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
};

startServer();
