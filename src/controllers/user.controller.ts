import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';

const mongoose = require('mongoose');
const User = require('../models/user.model.ts')(mongoose);

exports.list_users = function (req: Request, res: Response) {
  User.find({}, function (err: String, user: UserModel) {
    if (err) res.send(err);
    res.json(user);
  });
};
