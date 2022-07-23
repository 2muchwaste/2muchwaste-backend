import express, { Router } from 'express';
import DumpsterController from '../controllers/dumpster.controller';
import DumpsterModel from '../models/dumpster.model';
import { customerHandlers, operatorHandlers } from '../utils/constants';

const router: Router = express.Router();
const controller = new DumpsterController('Dumpster');

router.get('/', customerHandlers, controller.getAll(DumpsterModel));
router.post('/', operatorHandlers, controller.createOne(DumpsterModel));

router
  .route('/:id')
  .get(controller.getByID(DumpsterModel))
  .put(controller.updateByID(DumpsterModel))
  .delete(controller.deleteByID(DumpsterModel));
router
  .route('/:id/availability')
  .get(controller.getAvailability(DumpsterModel))
  .put(controller.setAvailability(DumpsterModel));
router
  .route('/:id/weight')
  .get(controller.getWeight(DumpsterModel))
  .put(controller.setWeight(DumpsterModel));

export default router;
