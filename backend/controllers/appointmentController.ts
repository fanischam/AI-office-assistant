import { Request, Response } from 'express';
import asyncHandler from '../middleware/asyncHandler';
import Appointment from '../models/appointmentModel';

// @desc    GET all appointments
// @route   GET /api/appointments
// @access  Public
const getAppointments = asyncHandler(async (req: Request, res: Response) => {
  const appointments = await Appointment.find({});
  res.json(appointments);
});

// @desc    Get an appointment by Id
// @route   GET /api/appointments/:id
// @access  Public
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

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Public
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

// @desc    Update an appointment
// @route   PUT /api/appointments/:id
// @access  Public
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

// @desc    Delete an appointment
// @route   DELETE /api/appointments/:id
// @access  Public
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
  updateAppointment,
  deleteAppointment,
};
