import { DocumentDefinition, Model } from 'mongoose';
import { IUser } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../controllers/auth.controller';

export default class UserService<T extends IUser> {
  signUp = async (user: DocumentDefinition<T>) => {
    try {
      await Model<T>.create(user);
    } catch (err) {
      throw err;
    }
  };

  login = async (user: DocumentDefinition<T>) => {
    try {
      const foundUser = await Model<T>.findOne({
        email: user.email,
      });
      if (!foundUser) throw new Error('Email is not correct');
      const isMatch = bcrypt.compareSync(
        user.passwordHash,
        foundUser.passwordHash
      );
      if (isMatch) {
        const token = jwt.sign(
          {
            _id: foundUser._id?.toString(),
            email: foundUser.email,
          },
          SECRET_KEY,
          { expiresIn: '2 days' }
        );
        // @ts-ignore
        return { user: { _id, email }, token: token };
      } else throw new Error('Password is not correct');
    } catch (err) {
      throw err;
    }
  };
}
