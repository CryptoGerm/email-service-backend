import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => res.status(200).json({ message: 'Hello from email service' }));

export default router;
