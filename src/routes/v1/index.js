import { Router } from 'express';

import { protect } from '../../controllers/Auth';
import publicRouter from './Public';
import authRouter from './Auth';
import userRouter from './User';
import mailRouter from './Mail';

const router = Router();

// public routes
router.use('/', publicRouter);
// auth routes
router.use('/auth', authRouter);
// protected routes
router.use('/api', protect);
router.use('/api/user', userRouter);
router.use('/api/mail', mailRouter);

export default router;
