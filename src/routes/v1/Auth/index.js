import { Router } from 'express';

import { register, login, googleAuth } from '../../../controllers/Auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);

export default router;
