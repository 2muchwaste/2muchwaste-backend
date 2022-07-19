import { IOperator } from '../models/operator.model';
import UserController from './user.controller';
import { Model } from 'mongoose';
import { Request, Response } from 'express';

export default class OperatorController extends UserController<IOperator> {
  getDistrictsFromOpCF =
    (model: Model<IOperator>) => async (req: Request, res: Response) => {
      model.find(
        { cf: req.params.cf },
        { districts: 1, _id: 0, __t: 0 },
        (err: String, doc: Model<IOperator>) => {
          if (err) res.send(err);
          res.json(doc);
        }
      );
    };

  getEmptiesFromOpCF =
    (model: Model<IOperator>) => async (req: Request, res: Response) => {
      model.find(
        { cf: req.params.cf },
        { empties: 1, _id: 0, __t: 0 },
        (err: String, doc: Model<IOperator>) => {
          if (err) res.send(err);
          res.json(doc);
        }
      );
    };
}
