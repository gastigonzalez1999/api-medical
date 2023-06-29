import Router from 'express';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validation';
import AuthController from '../auth/auth.controller';

const router = Router();
const authController = new AuthController();

router.post('/register', [
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    validateFields
] , authController.register);

router.post('/login', [
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    validateFields
] , authController.login);

// router.post('/google', [
//     check('id_token', 'google token is required').not().isEmpty(),
//     validateFields
// ] , googleSignIn);

export default router;