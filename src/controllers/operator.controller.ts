import { IOperator } from '../models/operator.model';
import UserController from './user.controller';
import { Model } from 'mongoose';
import { Request, Response } from 'express';

export default class OperatorController extends UserController<IOperator> {
  // TODO. Give only districts in output
  getDistrictsFromOpEmail =
    (model: Model<IOperator>) => async (req: Request, res: Response) => {
      model.find(
        { email: req.params.email },
        (err: String, doc: Model<IOperator>) => {
          if (err) res.send(err);
          res.json(doc);
        }
      );
    };
  // TODO. Give only empties in output
  getEmptiesFromOpEmail =
    (model: Model<IOperator>) => async (req: Request, res: Response) => {
      model.find(
        { email: req.params.email },
        (err: String, doc: Model<IOperator>) => {
          if (err) res.send(err);
          res.json(doc);
        }
      );
    };

}
