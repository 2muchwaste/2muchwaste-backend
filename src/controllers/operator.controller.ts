import { Request, Response } from 'express';
import { OperatorModel } from '../models/operator.model';

const mongoose = require('mongoose');
const Operator = require('../models/operator.model')(mongoose);

exports.getOperators = function (req: Request, res: Response) {
  Operator.find({}, function (err: String, operator: OperatorModel) {
    if (err) res.send(err);
    res.json(operator);
  });
};

exports.getOperatorByID = function (req: Request, res: Response) {
  Operator.findById(
    req.params.id,
    function (err: String, operator: OperatorModel) {
      if (err) res.send(err);
      else {
        if (operator == null) res.status(404).send('User not found');
        else res.json(operator);
      }
    }
  );
};

exports.updateOperator = function (req: Request, res: Response) {
  Operator.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    function (err: String, operator: OperatorModel) {
      if (err) res.send(err);
      else {
        if (operator == null) res.status(404).send('User not found');
        else res.json(operator);
      }
    }
  );
};

exports.deleteOperator = function (req: Request, res: Response) {
  Operator.deleteOne(
    { _id: req.params.id },
    function (err: String, result: { deletedCount: number }) {
      if (err) res.send(err);
      else {
        if (result.deletedCount == 0) res.status(404).send('User not found');
        else res.json('User successfully deleted');
      }
    }
  );
};
