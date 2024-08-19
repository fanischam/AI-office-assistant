import { Request, Response } from 'express';
import asyncHandler from '../middleware/asyncHandler';
import { processAppointmentPrompt } from '../services/promptRecognitionService';

const processPrompt = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      res.status(400).json({ error: 'A prompt is required' });
      return;
    }

    const response = await processAppointmentPrompt(prompt);
    res.json(response);
  } catch (error: any) {
    console.error('Error occurred during prompt processing:', error);
    res
      .status(500)
      .json({ error: error.message || 'Failed to process prompt.' });
  }
});

export { processPrompt };
