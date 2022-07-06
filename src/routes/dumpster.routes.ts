import express, { Router } from 'express';
import DumpsterController from '../controllers/dumpster.controller';
import DumpsterModel from '../models/dumpster.model';

const router: Router = express.Router();
const dumpsterController = new DumpsterController('Dumpster');

router
  .route('/')
  .get(dumpsterController.getAll(DumpsterModel))
  .post(dumpsterController.createOne(DumpsterModel));
router
  .route('/:id')
  .get(dumpsterController.getByID(DumpsterModel))
  .put(dumpsterController.updateByID(DumpsterModel))
  .delete(dumpsterController.deleteByID(DumpsterModel));

export default router;
