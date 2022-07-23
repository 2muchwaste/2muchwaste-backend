import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user.model';
import { Roles } from '../enums/Roles';

const checkDuplicateCForEmail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  UserModel.findOne({
    cf: req.body.cf,
  }).exec((err, doc) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (doc) {
      res.status(400).send({ message: 'Failed! CF already in use' });
      return;
    }
    UserModel.findOne({
      email: req.body.email,
    }).exec((err, doc) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (doc) {
        res.status(400).send({ message: 'Failed! Email already in use' });
        return;
      }
      next();
    });
  });
};
// Maybe useless with role as enum in backend
const checkRolesExisted = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (Object.values(Roles).includes(req.body.roles[i])) {
        res.status(400).send({
          message: 'Failed! Role ${req.body.roles[i]} does not exist!',
        });
        return;
      }
    }
  }
  next();
};

export const verifySignUp = {
  checkDuplicateCForEmail,
  checkRolesExisted,
};
