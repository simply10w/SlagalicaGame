import { createError } from '@slagalica-api/util';
import { User, UserType } from '@slagalica/data';
import JwtMiddleware from 'express-jwt';
import * as StatusCodes from 'http-status-codes';
import { decode, sign, verify } from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'slagalica-secret';
const AUDIENCE = process.env.JWT_AUDIENCE || 'slagalica/client';
const ISSUER = process.env.JWT_ISSUER || 'slagalica/api';

interface TokenData {
  type: UserType;
  id: string;
}

function createAuthMiddleware() {
  return JwtMiddleware({
    secret: SECRET,
    audience: AUDIENCE,
    issuer: ISSUER
  });
}

function createTokenForUser(user: User) {
  return sign(
    { type: user.type, username: user.userName, id: user._id },
    SECRET,
    {
      audience: AUDIENCE,
      issuer: ISSUER,
      expiresIn: '2 days'
    }
  );
}

function decodeToken(token: string): TokenData {
  return decode(token) as TokenData;
}

function verifyToken(token: string): TokenData {
  return verify(token, SECRET, {
    audience: AUDIENCE,
    issuer: ISSUER
  }) as TokenData;
}

function interceptAuthError(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(StatusCodes.UNAUTHORIZED).json(createError('Not logged in'));
  }
}

export {
  createAuthMiddleware,
  createTokenForUser,
  decodeToken,
  verifyToken,
  interceptAuthError
};
