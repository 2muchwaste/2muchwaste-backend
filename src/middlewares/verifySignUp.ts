import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user.model';
import { Roles } from '../enums/Roles';

const checkDuplicateEmail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};
// Maybe useless with role as enum in backend
const checkRoleExists = (req: Request, res: Response, next: NextFunction) => {
  if (req.params.role) {
    if (!Object.values(Roles).includes(req.body.role)) {
      res.status(400).send({
        message: 'Failed! Role ${req.params.role}=' + req.params.role + ' does not exist!',
      });
      return;
    }
  }
  next();
};

export const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
  checkRoleExists: checkRoleExists,
};
