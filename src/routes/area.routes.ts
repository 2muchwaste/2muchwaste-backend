import express, { Router } from 'express';
import AreaController from '../controllers/area.controller';
import AreaModel from '../models/area.model';
import { operatorHandlers } from '../utils/constants';

const router: Router = express.Router();
const controller = new AreaController('Areas');
router.use(operatorHandlers);
router
  .route('/')
  .get(controller.getAll(AreaModel))
  .post(controller.createOne(AreaModel));
router
  .route('/:zipCode')
  .get(controller.getAreasFromZipCode(AreaModel))
  .patch(controller.updateAreaByZipCode(AreaModel))
  .delete(controller.deleteByZipCode(AreaModel));
router
  .route('/:zipCode/:districtName')
  .get(controller.getAreaFromZipCodeAndName(AreaModel))
  .post(controller.addStreetToArea(AreaModel))
  .patch(controller.updateAreaByZipCodeAndName(AreaModel))
  .delete(controller.deleteByZipCodeAndName(AreaModel));
router
  .route('/:zipCode/:districtName/:street')
  .get(controller.getAreaFromZipCodeAndName(AreaModel))
  .patch(controller.addStreetToArea(AreaModel));

export default router;
