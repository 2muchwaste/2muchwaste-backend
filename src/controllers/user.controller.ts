import BasicService from '../services/basic.service';
import UserModel, { IUser } from '../models/user.model';

const mongoose = require('mongoose');
const service = new BasicService<IUser>('User');

export default class UserController {
  getUsers = service.getAll(UserModel);
  getUserByID = service.getByID(UserModel);
  updateUser = service.updateByID(UserModel);
  createUser = service.createOne(UserModel);
  deleteUser = service.deleteByID(UserModel);
}
