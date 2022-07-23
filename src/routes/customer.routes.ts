import express, { Router } from 'express';
import CustomerController from '../controllers/customer.controller';
import CustomerModel from '../models/customer.model';
import { Roles } from '../enums/Roles';
import { isAdmin, isCustomer, verifyToken } from '../middlewares/authJwt';
const router: Router = express.Router();

const customerController = new CustomerController(Roles.CUSTOMER.toString());

router.use(verifyToken, isCustomer);
const handlers = [verifyToken, isCustomer];
router.get('/:id', handlers, customerController.getByID(CustomerModel));
router.put('/:id', handlers, customerController.updateByID(CustomerModel));
router.delete('/:id', handlers, customerController.deleteByID(CustomerModel));
router.get(
  '/:cf/notifications',
  handlers,
  customerController.getNotifications(CustomerModel)
);
router.post(
  '/:cf/notifications',
  handlers,
  customerController.addNotification(CustomerModel)
);
router.put(
  '/:cf/notifications/:id',
  handlers,
  customerController.readNotification(CustomerModel)
);
router
  .use(verifyToken, isAdmin)
  .route('/')
  .get(customerController.getAll(CustomerModel));
export default router;
