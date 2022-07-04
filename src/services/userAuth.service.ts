import { Model } from 'mongoose';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';
import { CustomerModel } from '../models/customer.model';
import { SECRET_KEY } from '../controllers/auth.controller';

class UserAuthService<T extends UserModel> {
  docName: string;

  constructor(docName: string) {
    this.docName = docName;
  }

  signUp = (model: Model<T>) => (req: Request, res: Response) => {
    const user = new model(req.body);
    user.save((err: String, doc: Model<T>) => {
      if (err) res.send(err);
      res.status(201).json(doc);
    });
  };

  login = (model: Model<T>) => async (req: Request, res: Response) => {
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

export default UserAuthService;
