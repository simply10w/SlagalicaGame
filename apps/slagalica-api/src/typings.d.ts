import { UserType } from '@slagalica/data';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        type: UserType;
      };
    }
  }
}
