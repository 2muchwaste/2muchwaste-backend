import { Model } from 'mongoose';
import { Request, Response } from 'express';
import BasicService from './basic.service';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../controllers/auth.controller';
import { IUser } from '../models/user.model';

class UserService<T extends IUser> extends BasicService<T> {
  signUp = (model: Model<T>) => (req: Request, res: Response) => {
    const user = new model(req.body);
    user.save((err: String, doc: Model<T>) => {
      if (err) res.send(err);
      res.status(201).json(doc);
    });
  };

  login = (model: Model<T>) => async (req: Request, _res: Response) => {
    try {
      const user = new model(req.body);
      const foundUser = await model.findOne({ email: user.email });
      if (!foundUser) throw new Error('Email of user is not correct');
      const isMatch = bcrypt.compareSync(user.password, foundUser.passwordHash);
      if (isMatch) {
        const token = jwt.sign(
          { _id: foundUser._id?.toString(), email: foundUser.email },
          SECRET_KEY,
          {
            expiresIn: '2 days',
          }
        );
        return foundUser;
      } else throw new Error('Password is not correct');
    } catch (error) {
      throw error;
    }
  };
}

export default UserService;
