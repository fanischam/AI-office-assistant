import { getGPTResponse } from '../middleware/openaiMiddleware';
import {
  extractAppointmentDetails,
  createAppointment,
  getAppointmentsForToday,
  getAppointmentsForTomorrow,
  getAppointmentsForNextWeek,
  getAppointmentsForThisWeek,
} from './appointmentService';

export const processAppointmentPrompt = async (prompt: string) => {
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
        date
      );
      if (!result) {
        throw new Error('Failed to book appointment.');
      }
      return { message: 'Appointment booked successfully!' };
    } else {
      throw new Error(
        appointmentDetails?.error || 'Failed to extract appointment details.'
      );
    }
  }

  const keywordsForToday = ['appointments', 'today'];
  const keywordsForTomorrow = ['appointments', 'tomorrow'];
  const keywordsForThisWeek = ['appointments', 'this', 'week'];
  const keywordsForNextWeek = ['appointments', 'next', 'week'];

  const includesKeywords = (keywords: string[], text: string) => {
    return keywords.every((keyword) => text.toLowerCase().includes(keyword));
  };

  if (includesKeywords(keywordsForToday, prompt)) {
    const appointmentsForToday = await getAppointmentsForToday();
    return { appointments: appointmentsForToday };
  }

  if (includesKeywords(keywordsForTomorrow, prompt)) {
    const appointmentsForTomorrow = await getAppointmentsForTomorrow();
    return { appointments: appointmentsForTomorrow };
  }

  if (includesKeywords(keywordsForThisWeek, prompt)) {
    const appointmentsForThisWeek = await getAppointmentsForThisWeek();
    return { appointments: appointmentsForThisWeek };
  }

  if (includesKeywords(keywordsForNextWeek, prompt)) {
    const appointmentsForNextWeek = await getAppointmentsForNextWeek();
    return { appointments: appointmentsForNextWeek };
  }

  return {
    response:
      'My purpose is only to book new appointments for you and provide you with details about your appointments for today, tomorrow, this week or next week. For now, I do not have other functionalities.',
  };
};
