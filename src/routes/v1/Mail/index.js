import { Router } from 'express';

import { createMail, mailListScheduled, mailListSent, sendMail, mailListScheduledSent } from '../../../controllers/Mail';

const router = Router();

router.post('/create', createMail);
router.post('/send', sendMail);
router.get('/scheduled', mailListScheduled);
router.get('/sent', mailListSent);
router.get('/sent-scheduled', mailListScheduledSent);

export default router;
