import BaseController from './base.controller';
import { ICost } from '../models/cost.model';
import { Model } from 'mongoose';
import { Request, Response } from 'express';

export default class CostController extends BaseController<ICost> {
  getCost = (model: Model<ICost>) => async (req: Request, res: Response) => {
    model.findOne(
      { type: req.params.type },
      (err: String, doc: Model<ICost>) => {
        if (err) res.send(err);
        res.json(doc);
      }
    );
  };

  updatePrice =
    (model: Model<ICost>) => async (req: Request, res: Response) => {
      model.findOneAndUpdate(
        { type: req.params.type },
        req.body,
        { new: true, runValidators: true },
        (err, doc) => {
          if (err) res.send(err);
          else {
            if (doc == null) res.status(404).send('Doc not found');
            else res.json(doc);
          }
        }
      );
    };

  deleteByType =
    (model: Model<ICost>) => async (req: Request, res: Response) => {
      model.findOneAndDelete(
        { type: req.params.type },
        (err: String, result: { deletedCount: number }) => {
          if (err) res.send(err);
          else {
            if (result.deletedCount === 0)
              res.status(404).send('Doc not found');
            else res.json('Doc successfully deleted');
          }
        }
      );
    };
}
