import express, { Router } from 'express';
import CustomerController from '../controllers/customer.controller';
import CustomerModel from '../models/customer.model';
import { Roles } from '../enums/Roles';
const router: Router = express.Router();

const customerController = new CustomerController(Roles.CUSTOMER.toString());

router
  .route('/')
  .get(customerController.getAll(CustomerModel))
  .post(customerController.createOne(CustomerModel));
router
  .route('/:id')
  .get(customerController.getByID(CustomerModel))
  .put(customerController.updateByID(CustomerModel))
  .delete(customerController.deleteByID(CustomerModel));
//   .get(auth, customerController.getByID(CustomerModel))
//   .put(auth, customerController.updateByID(CustomerModel))
//   .delete(auth, customerController.deleteByID(CustomerModel));
router
  .route('/:cf/notifications')
  .get(customerController.getNotifications(CustomerModel))
  .post(customerController.addNotification(CustomerModel));
router.route('/signup').post(customerController.signUp(CustomerModel));
router.route('/login').post(customerController.login(CustomerModel));

export default router;
