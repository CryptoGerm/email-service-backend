import rateLimit from 'express-rate-limit';

export default rateLimit({ max: 20, windowMs: 15 * 60 * 1000, skipSuccessfulRequests: true });
