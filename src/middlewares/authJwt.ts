import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';

const getJwtSecret = () => process.env.JWT_SECRET || '2muchwaste_secretkey!!';

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // @ts-ignore
  let token = req.session.token;
  if (!token) return res.status(403).send({ message: 'No token provided' });
  jwt.verify(token, getJwtSecret(), (err: any, decoded: any) => {
    if (err) return res.status(401).send({ message: 'Unauthorized!' });
    req.userID = decoded._id;
    next();
  });
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.userID)
    return res.status(403).send({ message: 'Require admin role!' });
  UserModel.findById(req.userID)
    .populate('role', '-__v')
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      // @ts-ignore
      const role = user?.role?.name;
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (role === 'admin') {
        next();
        return;
      }
      res.status(403).send({ message: 'Require admin role!' });
    });
};
export const isOperator = (req: Request, res: Response, next: NextFunction) => {
  if (!req.userID)
    return res.status(403).send({ message: 'Require operator role!' });
  UserModel.findById(req.userID)
    .populate('role', '-__v')
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      // @ts-ignore
      const role = user?.role?.name;
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (role === 'operator' || role === 'admin') {
        next();
        return;
      }
      res.status(403).send({ message: 'Require operator role!' });
    });
};
export const isCustomer = (req: Request, res: Response, next: NextFunction) => {
  if (!req.userID)
    return res.status(403).send({ message: 'Require customer role!' });
  UserModel.findById(req.userID)
    .populate('role', '-__v')
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      // @ts-ignore
      const role = user?.role?.name;
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (role === 'customer' || role === 'operator' || role === 'admin') {
        next();
        return;
      }
      res.status(403).send({ message: 'Require customer role!' });
    });
};
