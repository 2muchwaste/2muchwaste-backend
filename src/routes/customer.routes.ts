import express, { Router } from 'express';
import CustomerController from '../controllers/customer.controller';
import { auth } from '../controllers/auth.controller';
const router: Router = express.Router();

const customerController = new CustomerController();

router
  .route('/')
  .get(customerController.getCustomers)
  .post(customerController.createCustomer);
router
  .route('/:id')
  .get(customerController.getCustomerByID)
  .put(customerController.updateCustomer)
  .delete(customerController.deleteCustomer);
//   .get(auth, customerController.getCustomerByID)
//   .put(auth, customerController.updateCustomer)
//   .delete(auth, customerController.deleteCustomer);
// router.route('/signup').post(customerController.signup);
// router.route('/login').post(customerController.login);

export default router;
