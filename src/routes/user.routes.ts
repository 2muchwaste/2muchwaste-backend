import express, { Router } from 'express';
import UserController from '../controllers/user.controller';
import UserModel from '../models/user.model';

const router: Router = express.Router();
const userController = new UserController('User');

router.route('/').get(userController.getAll(UserModel));
router
  .route('/:id')
  .get(userController.getByID(UserModel))
  .put(userController.updateByID(UserModel))
  .delete(userController.deleteByID(UserModel));

export default router;
