import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface tokenPayload {
  id: number;
  exp: number;
  sub: string;
}

interface headerProps extends Request {
  user: {
    id: string;
    pharmacieId?: string;
    userId?: string;
  };
}

export default function ensureEmployeeAuthenticated(
  req: headerProps,
  res: Response,
  next: NextFunction,
): void {
  // validate token
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as tokenPayload;

    // ['id do funcionario', 'id da farmacia', 'id do usuario']
    const [employeeId, pharmacieId, userId] = sub.split(',');

    req.user = {
      id: employeeId,
      pharmacieId,
      userId,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
