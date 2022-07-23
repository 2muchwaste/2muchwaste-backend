import express, { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { verifySignUp } from '../middlewares/verifySignUp';

const router: Router = express.Router();
const controller = new AuthController();

router.route('/:role/signin').post(controller.signIn());
router.route('/:role/signout').post(controller.signOut());
router.use(verifySignUp.checkDuplicateEmail, verifySignUp.checkRoleExists);
router.route('/:role/signup').post(controller.signUp());

export default router;
