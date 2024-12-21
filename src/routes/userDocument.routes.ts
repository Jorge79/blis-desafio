import { Router } from 'express';
import userDocumentController from '../controllers/userDocument.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { uploadConfig } from '../config/multer';

const userDocumentRoutes = Router();

userDocumentRoutes.post(
  '/users/documents',
  authMiddleware,
  uploadConfig.single('document'),
  (req, res) => userDocumentController.create(req, res),
);

userDocumentRoutes.get('/users/all/documents', authMiddleware, (req, res) =>
  userDocumentController.listDocument(req, res),
);

export default userDocumentRoutes;
