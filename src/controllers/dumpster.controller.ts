import BaseController from './base.controller';
import { IDumpster } from '../models/dumpster.model';
import { Request, Response } from 'express';
import { Model } from 'mongoose';
import DumpsterService from '../services/dumpster.service';

export default class DumpsterController extends BaseController<IDumpster> {
  service = new DumpsterService();
  getAvailability =
    (model: Model<IDumpster>) => (req: Request, res: Response) => {
      this.service.getAvailability(model, req, res);
    };
  setAvailability =
    (model: Model<IDumpster>) => (req: Request, res: Response) => {
      this.service.setAvailability(model, req, res);
    };
  getWeight = (model: Model<IDumpster>) => (req: Request, res: Response) => {
    this.service.getWeight(model, req, res);
  };
  setWeight = (model: Model<IDumpster>) => (req: Request, res: Response) => {
    this.service.setWeight(model, req, res);
  };
  getByAreaAndZipCode = (model: Model<IDumpster>) => (req: Request, res: Response) => {
    this.service.getDumpstersByAreaAndZipCode(model, req, res);
  }
}
