import { Router } from 'express';
import { me } from '../../../controllers/User';

const router = Router();

router.get('/details', me);

export default router;
