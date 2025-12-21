import { Router } from 'express';
import { userController } from './user.controller';

const router = Router();

// Example route: Get user profile
router.get('/:id',userController.getUser);
router.post('/',userController.createUser);
router.delete('/:id',userController.deleteUser);

export const userRoutes = router; 