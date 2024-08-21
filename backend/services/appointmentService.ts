import mongoose, { Types } from 'mongoose';
import { createAppointmentDirect } from '../controllers/appointmentController';
import Appointment from '../models/appointmentModel';
import { parseRelativeDate } from '../utils/dateUtils';

const extractAppointmentDetails = (response: string) => {
  const match = response.match(
    /- Appointment with:\s*(.+)\n- Purpose:\s*(.+)\n- Date:\s*(.+)\n- Time:\s*(.+)\n- Contact Number:\s*(\d)/
  );

  if (!match) {
    return {
      error:
        "Unable to extract appointment details. Please provide the purpose of the appointment, the participant, the participant's phone number and the date.",
    };
  }

  const [
    _,
    participant,
    purpose,
    dateString,
    timeString,
    participantPhoneNumber,
  ] = match;

  const date = parseRelativeDate(dateString, timeString);

  if (purpose == 'Not specified') {
    return { error: 'Please specify the purpose of the appointment.' };
  }

  // if (participantPhoneNumber.length !== 10) {
  //   return { error: 'Phone number must have 10 digits.' };
  // }

  if (!date) {
    return {
      error:
        'Invalid date format. Please specify a date like Monday 18th of August at 7 am.',
    };
  }

  const title = purpose;

  return {
    title,
    participant,
    participantPhoneNumber: parseInt(participantPhoneNumber, 10),
    date,
  };
};

const createAppointment = async (
  title: string,
  participant: string,
  participantPhoneNumber: number,
  date: Date,
  userId: string
): Promise<{ message: string; appointment?: any } | { error: string }> => {
  try {
    const appointment = await createAppointmentDirect(
      title,
      participant,
      participantPhoneNumber,
      date,
      userId
    );
    return { message: 'Appointment created successfully', appointment };
  } catch (error: any) {
    console.error('Error booking appointment:', error);
    return {
      error:
        error.message ||
        'An unknown error occurred while booking the appointment.',
    };
  }
};

const getAppointmentsForToday = async (userId: string) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);

  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return await Appointment.find({
    user: userObjectId,
    date: { $gte: start, $lte: end },
  }).sort({ date: 1 });
};

const getAppointmentsForTomorrow = async (userId: string) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);

  const start = new Date();
  start.setDate(start.getDate() + 1);
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setDate(end.getDate() + 1);
  end.setHours(23, 59, 59, 999);

  return await Appointment.find({
    user: userObjectId,
    date: { $gte: start, $lte: end },
  }).sort({ date: 1 });
};

const getAppointmentsForThisWeek = async (userId: string) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);

  const start = new Date();
  start.setDate(start.getDate());
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return await Appointment.find({
    user: userObjectId,
    date: { $gte: start, $lte: end },
  }).sort({ date: 1 });
};

const getAppointmentsForNextWeek = async (userId: string) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);

  const start = new Date();
  start.setDate(start.getDate() + (7 - start.getDay()));
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return await Appointment.find({
    user: userObjectId,
    date: { $gte: start, $lte: end },
  }).sort({ date: 1 });
};

export {
  extractAppointmentDetails,
  createAppointment,
  getAppointmentsForToday,
  getAppointmentsForTomorrow,
  getAppointmentsForThisWeek,
  getAppointmentsForNextWeek,
};
