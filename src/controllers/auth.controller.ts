import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export const SECRET_KEY: Secret = process.env.JWT_SECRET || 'secret-error';

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    (req as CustomRequest).token = jwt.verify(token, SECRET_KEY);

    next();
  } catch (err) {
    res.status(401).send('Please authenticate');
  }
};
