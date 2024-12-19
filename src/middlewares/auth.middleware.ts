import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: string;
  iat: number;
  exp: number;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('Chave JWT não configurada');
    }

    const data = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload;
    req.userId = data.userId;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};
