import { Model } from 'mongoose';
import { Request, Response } from 'express';

class BasicService<T> {
  docName: string;

  constructor(docName: string) {
    this.docName = docName;
  }

  getByID = (model: Model<T>) => (req: Request, res: Response) => {
    model.findById(req.params.id, function (err: String, doc: Model<T>) {
      if (err) res.send(err);
      else {
        if (doc == null) res.status(404).send('Doc not found');
        else res.json(doc);
      }
    });
  };

  updateByID = (model: Model<T>) => (req: Request, _res: Response) => {
    model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
      (err, doc, res) => {
        if (err) res.send(err);
        else {
          if (doc == null) res.status(404).send('Doc not found');
          else res.json(doc);
        }
      }
    );
  };

  createOne = (model: Model<T>) => (req: Request, res: Response) => {
    const new_doc = new model(req.body);
    new_doc.save((err: String, doc: Model<T>) => {
      if (err) res.send(err);
      res.status(201).json(doc);
    });
  };

  deleteByID = (model: Model<T>) => (req: Request, res: Response) => {
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

  getAll = (model: Model<T>) => (req: Request, res: Response) => {
    model.find({}, (err: String, doc: Model<T>) => {
      if (err) res.send(err);
      res.json(doc);
    });
  };
}

export default BasicService;
