import BaseController from './base.controller';
import { IUser } from '../models/user.model';
import UserService from '../services/user.service';

class UserController<T extends IUser> extends BaseController<T> {
  service = new UserService();
}

export default UserController;
