import ControllerFactory from '../utils/controller.factory';
import { DumpsterModel } from '../models/dumpster.model';

const mongoose = require('mongoose');
const Dumpster = require('../models/dumpster.model')(mongoose);
const controller = new ControllerFactory<DumpsterModel>('Dumpster');

export default class DumpsterController {
  getDumpsters = controller.getAll(Dumpster);

  getDumpsterByID = controller.getByID(Dumpster);

  createDumpster = controller.createOne(Dumpster);

  updateDumpster = controller.updateByID(Dumpster);

  deleteDumpster = controller.deleteByID(Dumpster);
}
