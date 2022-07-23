import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import RoleModel, { IRole } from '../models/role.model';
import { Model } from 'mongoose';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user.model';

export default class AuthController<T extends IUser> {
  private saltRounds: number = 8;

  signUp = (model: Model<T>) => async (req: Request, res: Response) => {
    RoleModel.findOne({ name: req.body.role }, (err: String, doc: IRole) => {
      const newUser = new model({
        name: req.body.name,
        surname: req.body.surname,
        birthday: req.body.birthday,
        cf: req.body.cf,
        email: req.body.email,
        address: req.body.address,
        zipCode: req.body.zipCode,
        city: req.body.city,
        password: bcrypt.hashSync(req.body.password, this.saltRounds),
        role: doc._id,
      });
      console.log(newUser);
      newUser.save((err, doc) => {
        if (err) res.send(err);
        else res.status(201).json(doc);
      });
    });
  };

  signIn = (model: Model<T>) => (req: Request, res: Response) => {
    model
      .findOne({
        email: req.body.email,
      })
      .populate('roles', '-__v')
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
        }
        if (!user) return res.status(404).send({ message: 'User not found.' });
        const passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (!passwordIsValid)
          return res.status(401).send({ message: 'Invalid password' });
        const secret = process.env.JWT_SECRET || '';
        // @ts-ignore
        req.session.token = jwt.sign({ _id: user._id }, secret, {
          expiresIn: 86400, // 24 hours
        });
        res.status(200).send({
          id: user._id,
          email: user.email,
          role: user.role,
        });
      });
  };

  signOut = (_model: Model<T>) => async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      req.session = null;
      return res.status(200).send({ message: "You've been signed out!" });
    } catch (e) {
      return res.status(500).send({ message: e });
    }
  };
}
