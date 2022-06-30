import { Request, Response } from 'express';
import { OperatorModel } from '../models/operator.model';
import { CustomerModel } from '../models/customer.model';

const mongoose = require('mongoose');
const Operator = require('../models/operator.model')(mongoose);

export default class OperatorController {
  getOperators = (req: Request, res: Response) => {
    Operator.find({}, function (err: String, operator: OperatorModel) {
      if (err) res.send(err);
      res.json(operator);
    });
  };

  getOperatorByID = (req: Request, res: Response) => {
    Operator.findById(
      req.params.id,
      function (err: String, operator: OperatorModel) {
        if (err) res.send(err);
        else {
          if (operator == null) res.status(404).send('Operator not found');
          else res.json(operator);
        }
      }
    );
  };

  createOperator = (req: Request, res: Response) => {
    const new_user = new Operator(req.body);
    new_user.save(function (err: String, user: CustomerModel) {
      if (err) res.send(err);
      res.status(201).json(user);
    });
  };

  updateOperator = (req: Request, res: Response) => {
    Operator.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      function (err: String, operator: OperatorModel) {
        if (err) res.send(err);
        else {
          if (operator == null) res.status(404).send('Operator not found');
          else res.json(operator);
        }
      }
    );
  };

  deleteOperator = (req: Request, res: Response) => {
    Operator.deleteOne(
      { _id: req.params.id },
      function (err: String, result: { deletedCount: number }) {
        if (err) res.send(err);
        else {
          if (result.deletedCount == 0)
            res.status(404).send('Operator not found');
          else res.json('Operator successfully deleted');
        }
      }
    );
  };
}
