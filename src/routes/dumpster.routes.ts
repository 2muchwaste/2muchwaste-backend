import express, { Router } from 'express';
import DumpsterController from '../controllers/dumpster.controller';
import DumpsterModel from '../models/dumpster.model';

const router: Router = express.Router();
const controller = new DumpsterController('Dumpster');

router
  .route('/')
  .get(controller.getAll(DumpsterModel))
  .post(controller.createOne(DumpsterModel));
router
  .route('/:id')
  .get(controller.getByID(DumpsterModel))
  .put(controller.updateByID(DumpsterModel))
  .delete(controller.deleteByID(DumpsterModel));

export default router;
