import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth.middleware';
import { userController } from '../../controller/user.controller';
import { authController } from '../../controller/auth.controller';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/users', authMiddleware, userController.getAllUsers);
router.get('/users/:id', authMiddleware, userController.getUserById);
router.post('/users', authMiddleware, userController.createUser);
router.put('/users/:id', authMiddleware, userController.updateUser);
router.delete('/users/:id', authMiddleware, userController.deleteUser);

export default router;
