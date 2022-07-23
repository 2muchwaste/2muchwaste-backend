import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserModel, { IUser } from '../models/user.model';
import RoleModel, { IRole } from '../models/role.model';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // @ts-ignore
  let token = req.session.token;
  const secret = process.env.JWT_SECRET || '';
  if (!token) return res.status(403).send({ message: 'No token provided' });

  jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) return res.status(401).send({ message: 'Unauthorized!' });
    // @ts-ignore
    req.userID = decoded.id;
    next();
  });
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  if (!req.userID)
    return res.status(403).send({ message: 'Require admin role!' });
  // @ts-ignore
  UserModel.findById(req.userID).exec((err, user: IUser) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    RoleModel.find({ _id: { $in: user.role } }, (err: String, role: IRole) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (role.name === 'admin') {
        next();
        return;
      }
      res.status(403).send({ message: 'Require admin role!' });
    });
  });
};
export const isOperator = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  if (!req.userID)
    return res.status(403).send({ message: 'Require operator role!' });
  // @ts-ignore
  UserModel.findById(req.userID).exec((err, user: IUser) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    RoleModel.find({ _id: { $in: user.role } }, (err: String, role: IRole) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (role.name === 'operator' || role.name === 'admin') {
        next();
        return;
      }
      res.status(403).send({ message: 'Require operator role!' });
    });
  });
};
export const isCustomer = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  if (!req.userID)
    return res.status(403).send({ message: 'Require customer role!' });
  // @ts-ignore
  UserModel.findById(req.userID).exec((err, user: IUser) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    RoleModel.find({ _id: { $in: user.role } }, (err: String, role: IRole) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (
        role.name === 'customer' ||
        role.name === 'operator' ||
        role.name === 'admin'
      ) {
        next();
        return;
      }
      res.status(403).send({ message: 'Require customer role!' });
    });
  });
};
