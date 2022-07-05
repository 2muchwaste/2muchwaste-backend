import express, { Router } from 'express';
import UserController from '../controllers/user.controller';

const router: Router = express.Router();
const userController = new UserController();

router.route('/').get(userController.getUsers);
router
  .route('/:id')
  .get(userController.getUserByID)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

export default router;
