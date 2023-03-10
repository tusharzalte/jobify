import express from 'express';
const router = express.Router();
import { login, register, updateUser } from '../Controllers/authControllers.js';
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/update').patch(updateUser);
export default router;