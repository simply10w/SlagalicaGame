import { Request, Response, NextFunction } from 'express';
import * as StatusCodes from 'http-status-codes';
import { UserType } from '@slagalica/data';

function reject(res: Response) {
  return res
    .status(StatusCodes.UNAUTHORIZED)
    .json({ error: "You don't have permission." });
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.user.type === UserType.Admin) return next();
  else reject(res);
}

export function isSupervizor(req: Request, res: Response, next: NextFunction) {
  if (req.user.type === UserType.Supervizor) return next();
  else reject(res);
}

export function isPlayer(req: Request, res: Response, next: NextFunction) {
  if (req.user.type === UserType.Igrac) return next();
  else reject(res);
}
