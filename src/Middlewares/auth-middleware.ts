/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    export interface Request {
      session: { id: string; email: string };
    }
  }
}

export const checkAuth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { token } = req.headers;
    if (!token) {
      throw new Error ('No estas autenticado');
    }
    const { id, email } = jwt.verify(token as string,process.env.JWT_SECRET!) as any;
    req.session = { id, email }; //guardo en esta variable session(puede ser cualquier nombre) el payload que estaba formado por el id , email en el Login
    next();
  } catch (e) {
    res.status(401).send(e.message);
  }
};

export const checkIp = ( req: Request, res: Response, next: NextFunction): void => {
  try {
    if (req.hostname === 'localhost') {
      //aqui puede especificar desde que dominio quisiera que tenga acceso
      // console.log('req.hostname', req.hostname);
      next();
    } else {
      throw { code: 403, message: 'Acceso denegado' };
    }
  } catch (e) {
    res.status(e.code).send(e.message);
  }
};
