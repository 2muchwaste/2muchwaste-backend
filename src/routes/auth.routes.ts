import express, { Router } from 'express';

const router: Router = express.Router();
// const controller = new AuthController();

router.route('/signup').post();
router.route('/signin').post();
router.route('/signout').post();

export default router;
