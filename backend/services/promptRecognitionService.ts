import { getGPTResponse } from '../middleware/openaiMiddleware';
import {
  extractAppointmentDetails,
  createAppointment,
  getAppointments,
} from './appointmentService';

export const processAppointmentPrompt = async (
  prompt: string,
  userId: string
) => {
  const gptResponse = await getGPTResponse(prompt);

  if (gptResponse.toLowerCase().includes('book appointment')) {
    const appointmentDetails = extractAppointmentDetails(gptResponse);
    if (appointmentDetails && !('error' in appointmentDetails)) {
      const { title, participant, participantPhoneNumber, date } =
        appointmentDetails;
      const result = await createAppointment(
        title,
        participant,
        participantPhoneNumber,
        date,
        userId
      );

      if ('error' in result) {
        throw new Error(result.error);
      }

      return { message: 'Appointment booked successfully!' };
    } else {
      throw new Error(
        appointmentDetails?.error || 'Failed to extract appointment details.'
      );
    }
  }

  const keywordsForPeriods = {
    today: ['appointments', 'today'],
    tomorrow: ['appointments', 'tomorrow'],
    thisWeek: ['appointments', 'this', 'week'],
    nextWeek: ['appointments', 'next', 'week'],
  };

  const includesKeywords = (keywords: string[], text: string) => {
    return keywords.every((keyword) => text.toLowerCase().includes(keyword));
  };

  for (const period in keywordsForPeriods) {
    if (
      includesKeywords(
        keywordsForPeriods[period as keyof typeof keywordsForPeriods],
        prompt
      )
    ) {
      const appointments = await getAppointments(
        period as keyof typeof keywordsForPeriods,
        userId
      );
      return { appointments };
    }
  }

  return {
    response:
      'My purpose is only to book new appointments for you and provide you with details about your appointments for today, tomorrow, this week or next week. For now, I do not have other functionalities.',
  };
};
