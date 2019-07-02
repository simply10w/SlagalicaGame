import { Request, Response, NextFunction } from 'express';
import * as StatusCodes from 'http-status-codes';
import { UserType, User } from '@slagalica/data';

function reject(res: Response) {
  return res
    .status(StatusCodes.UNAUTHORIZED)
    .json({ error: "You don't have permission." });
}

export function AdminRole(req: Request, res: Response, next: NextFunction) {
  if (isAdmin(req.user)) return next();
  else reject(res);
}

export function isAdmin(user: Pick<User, 'type'>): boolean {
  return user.type === UserType.Admin;
}

export function SupervizorRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (isSupervizor(req.user)) return next();
  else reject(res);
}

export function isSupervizor(user: Pick<User, 'type'>): boolean {
  return user.type === UserType.Supervizor;
}

export function PlayerRole(req: Request, res: Response, next: NextFunction) {
  if (isPlayer(req.user)) return next();
  else reject(res);
}

export function isPlayer(user: Pick<User, 'type'>): boolean {
  return user.type === UserType.Igrac;
}
