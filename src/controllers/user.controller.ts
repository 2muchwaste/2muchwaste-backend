import { Model } from 'mongoose';
import { Request, Response } from 'express';
import BaseController from './base.controller';
import { IUser } from '../models/user.model';
import UserService from '../services/user.service';

class UserController<T extends IUser> extends BaseController<T> {
  service = new UserService();
  signUp = (_model: Model<T>) => async (req: Request, res: Response) => {
    try {
      await this.service.signUp(req.body);
      res.status(200).send('Inserted successfully');
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  login = (_model: Model<T>) => async (req: Request, res: Response) => {
    try {
      const foundUser = await this.service.login(req.body);
      res.status(200).send(foundUser);
    } catch (err) {
      throw err;
    }
  };
}

export default UserController;
