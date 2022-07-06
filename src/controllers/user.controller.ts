import BasicService from '../services/basic.service';
import UserModel, { IUser } from '../models/user.model';

const service = new BasicService<IUser>('User');

export default class UserController {
  getUsers = service.getAll(UserModel);
  getUserByID = service.getByID(UserModel);
  updateUser = service.updateByID(UserModel);
  deleteUser = service.deleteByID(UserModel);
}
