import { Router } from 'express';
import { userController } from './user.controller';
import auth from '../../middleware/auth';
import adminOrSelf from '../../middleware/self';

const router = Router();

// Example route: Get user profile
router.get('/',auth("admin"),userController.getUser);
router.put('/:userId',adminOrSelf("admin"),userController.updateUser);
router.delete('/:userId',auth("admin"),userController.deleteUser);

export const userRoutes = router; 