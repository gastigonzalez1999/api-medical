import { Router } from 'express';
import { check } from 'express-validator';
import { isValidRole, emailExist, userIdExists } from '../helpers/db-validators';
import { hasRole, isAdminRole } from '../middlewares/validate-roles';
import { validateJwt } from '../middlewares/validate-jwt';
import { validateFields } from '../middlewares/validation';
import UserController from '../user/user.controller';

const router: Router = Router();
const userController = new UserController();

router.get('/', userController.getUsers);

router.get('/id', [
    check('id', 'Not a valid Id').isMongoId(),
    check('id').custom(userIdExists),
    validateFields,
], userController.getUser);

router.put('/:id', [
    check('id', 'Not a valid Id').isMongoId(),
    check('id').custom(userIdExists),
    check('role').custom(isValidRole),
    validateFields,
], userController.updateUser);

router.post('/',
    [
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'The email is not valid').isEmail(),
        check('email').custom(emailExist),
        check('password', 'The password is required and must be longer than 6 letters').isLength({ min: 6 }),
        check('role', 'The role is not valid').isIn(['ADMIN', 'USER']),
        check('role').custom(isValidRole),
        validateFields,
    ], userController.createUser);

router.delete('/:id', [
    validateJwt,
    isAdminRole,
    hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'Not a valid Id').isMongoId(),
    check('id').custom(userIdExists),
    validateFields,
], userController.deleteUser);

export default router;