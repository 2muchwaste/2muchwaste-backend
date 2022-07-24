import { IUser } from '../models/user.model';

declare global {
  namespace Express {
    export interface Request {
      session?: any;
      userID: string;
      user?: IUser;
    }
  }
}
