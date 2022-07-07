import express, { Router } from 'express';
import AreaController from '../controllers/area.controller';
import AreaModel from '../models/area.model';

const router: Router = express.Router();
const controller = new AreaController('Areas');

router
  .route('/')
  .get(controller.getAll(AreaModel))
  .post(controller.createOne(AreaModel));
router
  .route('/:id')
  .get(controller.getByID(AreaModel))
  .put(controller.updateByID(AreaModel))
  .delete(controller.deleteByID(AreaModel));

export default router;
