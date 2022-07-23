import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import RoleModel, { IRole } from '../models/role.model';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user.model';
import CustomerModel from '../models/customer.model';
import OperatorModel from '../models/operator.model';
import AdminModel from '../models/admin.model';

export default class AuthController<T extends IUser> {
  private saltRounds: number = 8;
  private getRole = (req: Request) => {
    switch (req.params.role) {
      case 'customer':
        return CustomerModel;
      case 'operator':
        return OperatorModel;
      case 'admin':
        return AdminModel;
    }
  };

  signUp = () => async (req: Request, res: Response) => {
    const model = this.getRole(req);
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
      newUser.save((err: any, doc: any) => {
        if (err) res.send(err);
        else res.status(201).json(doc);
      });
    });
  };

  signIn = () => (req: Request, res: Response) => {
    const model = this.getRole(req);
    model
      .findOne({
        email: req.body.email,
      })
      .populate('role', '-__v')
      .exec(
        (
          err: any,
          user: { password: string; _id: any; email: any; role: any }
        ) => {
          if (err) {
            return res.status(500).send({ message: 'error! ' + err });
          }
          if (!user)
            return res.status(404).send({ message: 'User not found.' });
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
        }
      );
  };

  signOut = () => async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      req.session = null;
      return res.status(200).send({ message: "You've been signed out!" });
    } catch (e) {
      return res.status(500).send({ message: e });
    }
  };
}
