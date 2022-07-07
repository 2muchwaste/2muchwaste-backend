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
  .route('/:zipCode')
  .get(controller.getAreasFromZipCode(AreaModel))
  .put(controller.updateAreaByZipCode(AreaModel))
  .delete(controller.deleteByZipCode(AreaModel));
router
  .route('/:zipCode/:districtName')
  .get(controller.getAreaFromZipCodeAndName(AreaModel))
  .post(controller.addStreetToArea(AreaModel))
  .put(controller.updateAreaByZipCodeAndName(AreaModel))
  .delete(controller.deleteByZipCodeAndName(AreaModel));
router
  .route('/:zipCode/:districtName/:street')
  .get(controller.getAreaFromZipCodeAndName(AreaModel))
  .put(controller.addStreetToArea(AreaModel));

export default router;
