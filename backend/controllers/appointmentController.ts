import { Request, Response } from 'express';
import asyncHandler from '../middleware/asyncHandler';
import Appointment from '../models/appointmentModel';

const getAppointments = asyncHandler(async (req: Request, res: Response) => {
  const appointments = await Appointment.find({});
  res.json(appointments);
});

const getAppointmentById = asyncHandler(async (req: Request, res: Response) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (appointment) {
      res.json(appointment);
    } else {
      res.status(404).json({ message: 'Appointment not found' });
      return;
    }
  } catch (error) {
    res.status(404).json({ message: 'Appointment not found' });
    return;
  }
});

const createAppointment = asyncHandler(async (req: Request, res: Response) => {
  const { title, participant, participantPhoneNumber, date } = req.body;

  const appointExists = await Appointment.findOne({ date });

  if (appointExists) {
    res.status(400).json({
      message: 'An appointment already exists for this date',
    });
    return;
  }

  const appointment = await Appointment.create({
    title,
    participant,
    participantPhoneNumber,
    date,
  });

  if (appointment) {
    res.status(201).json({
      _id: appointment._id,
      title: appointment.title,
      participant: appointment.participant,
      participantPhoneNumber: appointment.participantPhoneNumber,
      date: appointment.date,
    });
  } else {
    res.status(400).json({ message: 'Invalid appointment data' });
    return;
  }
});

const createAppointmentDirect = async (
  title: string,
  participant: string,
  participantPhoneNumber: number,
  date: Date
) => {
  const appointExists = await Appointment.findOne({ date });

  if (appointExists) {
    console.error('Appointment already exists for this date:', date);
    throw new Error('An appointment already exists for this date');
  }

  const appointment = await Appointment.create({
    title,
    participant,
    participantPhoneNumber,
    date,
  });

  if (appointment) {
    return {
      _id: appointment._id,
      title: appointment.title,
      participant: appointment.participant,
      participantPhoneNumber: appointment.participantPhoneNumber,
      date: appointment.date,
    };
  } else {
    console.error('Failed to create appointment with provided data:', {
      title,
      participant,
      participantPhoneNumber,
      date,
    });
    throw new Error('Invalid appointment data');
  }
};

const updateAppointment = asyncHandler(async (req: Request, res: Response) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (appointment) {
      appointment.title = req.body.title || appointment.title;
      appointment.participant = req.body.participant || appointment.participant;
      appointment.participantPhoneNumber =
        req.body.participantPhoneNumber || appointment.participantPhoneNumber;
      appointment.date = req.body.date || appointment.date;

      const updatedAppointment = await appointment.save();

      res.json({
        _id: updatedAppointment._id,
        participant: updatedAppointment.participant,
        participantPhoneNumber: updatedAppointment.participantPhoneNumber,
        date: updatedAppointment.date,
      });
    } else {
      res.status(404).json({ message: 'Appointment not found' });
      return;
    }
  } catch (error) {
    res.status(404).json({ message: 'Appointment not found' });
    return;
  }
});

const deleteAppointment = asyncHandler(async (req: Request, res: Response) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (appointment) {
      await Appointment.deleteOne({ _id: appointment._id });
      res.json({ message: 'Appointment deleted' });
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    res.status(404).json({ message: 'Appointment not found' });
    return;
  }
});

export {
  getAppointments,
  getAppointmentById,
  createAppointment,
  createAppointmentDirect,
  updateAppointment,
  deleteAppointment,
};
