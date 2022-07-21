import { Request, Response } from 'express';
import { IDumpster } from '../models/dumpster.model';
import { Model } from 'mongoose';

export default class DumpsterService {
  setAvailability = (model: Model<IDumpster>, req: Request, res: Response) => {
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
  getAvailability = (model: Model<IDumpster>, req: Request, res: Response) => {
    model.findById(
      req.params.id,
      { available: 1, _id: 0 },
      (err: String, doc: Model<IDumpster>) => {
        if (err) res.send(err);
        else res.json(doc);
      }
    );
  };
  getWeight = (model: Model<IDumpster>, req: Request, res: Response) => {
    model.findById(
      req.params.id,
      { actualWeight: 1, _id: 0 },
      (err: String, doc: Model<IDumpster>) => {
        if (err) res.send(err);
        else res.json(doc);
      }
    );
  };
  setWeight = (model: Model<IDumpster>, req: Request, res: Response) => {
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
  emptyDumpster = (model: Model<IDumpster>, id: String, res: Response) => {
    model.findByIdAndUpdate(
      id,
      {
        $set: { actualWeight: 0.0 },
      },
      (err: String, doc: Model<IDumpster>) => {
        if (err) res.send(err);
        else res.json(doc);
      }
    );
  };
}
