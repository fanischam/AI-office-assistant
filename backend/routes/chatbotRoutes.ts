import express from 'express';
import { processPrompt } from '../controllers/chatbotController';

const router = express.Router();

router.post('/prompt', processPrompt);

export default router;
