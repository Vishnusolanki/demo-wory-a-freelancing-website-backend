import express, { Router } from 'express';
import validate from '../../src/middlewares/validate';
import {
    register as registerValidation,
    login as loginValidation,
} from '../../src/validations/auth.validation'; // Import named exports directly

import * as authController from '../../src/controllers/auth.controller';

const router: Router = express.Router();

router.post('/register', validate(registerValidation), authController.register);
router.post('/login', validate(loginValidation), authController.login);

export default router;
