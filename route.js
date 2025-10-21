import express from 'express';
import { hello } from './controller.js';

const router = express.Router();

router.route('/').get(hello);

export default router;
