import BaseController from './base.controller';
import { IDumpster } from '../models/dumpster.model';
import { Request, Response } from 'express';
import { Model } from 'mongoose';

export default class DumpsterController extends BaseController<IDumpster> {
  getAvailability =
    (model: Model<IDumpster>) => (req: Request, res: Response) => {
      model.findById(
        req.params.id,
        { available: 1, _id: 0 },
        (err: String, doc: Model<IDumpster>) => {
          if (err) res.send(err);
          else res.json(doc);
        }
      );
    };
  setAvailability =
    (model: Model<IDumpster>) => (req: Request, res: Response) => {
      model.findByIdAndUpdate(
        req.params.id,
        {
          $set: { available: req.body.available },
        },
        (err: String, doc: Model<IDumpster>) => {
          if (err) res.send(err);
          else res.json(doc);
        }
      );
    };
  getWeight = (model: Model<IDumpster>) => (req: Request, res: Response) => {
    model.findById(
      req.params.id,
      { actualWeight: 1, _id: 0 },
      (err: String, doc: Model<IDumpster>) => {
        if (err) res.send(err);
        else res.json(doc);
      }
    );
  };
  setWeight = (model: Model<IDumpster>) => (req: Request, res: Response) => {
    model.findByIdAndUpdate(
      req.params.id,
      {
        $set: { actualWeight: req.body.weight },
      },
      (err: String, doc: Model<IDumpster>) => {
        if (err) res.send(err);
        else res.json(doc);
      }
    );
  };
}
