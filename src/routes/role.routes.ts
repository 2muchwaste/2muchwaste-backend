import express, { Router } from 'express';
import RoleController from '../controllers/role.controller';
import RoleModel from '../models/role.model';

const router: Router = express.Router();
const controller = new RoleController('Role');

router.route('/').get(controller.getAll(RoleModel));
router
  .route('/:id')
  .get(controller.getByID(RoleModel))
  .post(controller.createOne(RoleModel))
  .patch(controller.updateByID(RoleModel))
  .delete(controller.deleteByID(RoleModel));

export default router;
