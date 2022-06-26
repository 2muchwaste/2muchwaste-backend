import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';

const mongoose = require('mongoose');
const User = require('../models/user.model.ts')(mongoose);

exports.getUsers = function (req: Request, res: Response) {
  User.find({}, function (err: String, user: UserModel) {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.getUserByID = function (req: Request, res: Response) {
  User.findById(req.params.id, function (err: String, user: UserModel) {
    if (err) res.send(err);
    else {
      if (user == null) res.status(404).send('User not found');
      else res.json(user);
    }
  });
};
