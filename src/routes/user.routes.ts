import express, { Router } from 'express';
import UserController from '../controllers/user.controller';
import UserModel from '../models/user.model';

const router: Router = express.Router();
const controller = new UserController('User');

router.route('/').get(controller.getAll(UserModel));
router
  .route('/:id')
  .get(controller.getByID(UserModel))
  .put(controller.updateByID(UserModel))
  .delete(controller.deleteByID(UserModel));

export default router;
