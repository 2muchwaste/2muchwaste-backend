import express, { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import CustomerModel from '../models/customer.model';
import OperatorModel from '../models/operator.model';
import { verifySignUp } from '../middlewares/verifySignUp';

const router: Router = express.Router();
const controller = new AuthController();

router.route('/customer/signin').post(controller.signIn(CustomerModel));
router.route('/customer/signout').post(controller.signOut(CustomerModel));
router.route('/operator/signin').post(controller.signIn(OperatorModel));
router.route('/operator/signout').post(controller.signIn(OperatorModel));
router.use(verifySignUp.checkDuplicateEmail, verifySignUp.checkRoleExists);
router.route('/customer/signup').post(controller.signUp(CustomerModel));
router.route('/operator/signup').post(controller.signUp(OperatorModel));

export default router;
