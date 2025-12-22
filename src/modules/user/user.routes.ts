import { Router } from 'express';
import { userController } from './user.controller';
import auth from '../../middleware/auth';
import adminOrSelf from '../../middleware/self';
import adminOnly from '../../middleware/admin';

const router = Router();

// Example route: Get user profile
router.get('/',auth(),adminOnly(),userController.getUser);
router.put('/:userId',auth(),adminOrSelf(),userController.updateUser);
router.delete('/:userId',auth(),adminOnly(),userController.deleteUser);

export const userRoutes = router; 