import { Model } from 'mongoose';
import { Request, Response } from 'express';

class BaseController<T> {
  discriminator: string;

  constructor(discriminator: string) {
    this.discriminator = discriminator;
  }

  getByID = (model: Model<T>) => async (req: Request, res: Response) => {
    model.findById(req.params.id, (err: String, doc: Model<T>) => {
      if (err) res.send(err);
      else {
        if (doc == null) res.status(404).send('Doc not found');
        else res.json(doc);
      }
    });
  };

  updateByID = (model: Model<T>) => async (req: Request, res: Response) => {
    model.findByIdAndUpdate(
      req.params.id,
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

  createOne = (model: Model<T>) => async (req: Request, res: Response) => {
    const newDoc = new model(req.body);
    newDoc.save((err: String, doc: Model<T>) => {
      console.log(doc);
      if (err) res.send(err);
      res.status(201).json(doc);
    });
  };

  deleteByID = (model: Model<T>) => async (req: Request, res: Response) => {
    model.findByIdAndDelete(
      req.params.id,
      (err: String, result: { deletedCount: number }) => {
        if (err) res.send(err);
        else {
          if (result.deletedCount === 0)
            res.status(404).send('Customer not found');
          else res.json('Doc successfully deleted');
        }
      }
    );
  };

  getAll = (model: Model<T>) => async (req: Request, res: Response) => {
    model.find({}, (err: String, doc: Model<T>) => {
      if (err) res.send(err);
      res.json(doc);
    });
  };
}

export default BaseController;
