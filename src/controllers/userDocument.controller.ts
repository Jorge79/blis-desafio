import { Request, Response } from 'express';
import UserDocumentService from '../services/userDocument.service';

class UserDocumentController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.userId;

      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const name = req.file.filename;
      const fileUrl = `/uploads/${req.file.filename}`;

      const userDocument = await UserDocumentService.create({
        user_id,
        name,
        url: fileUrl,
      });

      return res.status(201).json(userDocument);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async listDocument(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.userId;
      const documents = await UserDocumentService.listUserDocuments(userId);
      return res.json(documents);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new UserDocumentController();
