import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'


export const checkAuth = (req: Request, res: Response, next: NextFunction):void => {
  try {
    const { token } = req.headers;
    if (!token) {
      throw { code: 401, message: 'No estas autenticado' };
    }

    jwt.verify(token as string,process.env.JWT_SECRET!);
   next();
  } catch (e) {
    res.status(e.code).send(e.message);
  }
};

