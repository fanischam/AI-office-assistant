import { Request, Response } from 'express';
import asyncHandler from '../middleware/asyncHandler';
import Appointment from '../models/appointmentModel';
import User from '../models/userModel';

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
  const appointment = await Appointment.findById(req.params.id);
  if (appointment) {
    res.json(appointment);
  } else {
    res.status(404);
    throw new Error('Appointment not found');
  }
});

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Public
const createAppointment = asyncHandler(async (req: Request, res: Response) => {
  const { title, participant, participantPhoneNumber, date } = req.body;

  const appointExists = await Appointment.findOne({ date });

  if (appointExists) {
    res.status(400);
    throw new Error('An appointment already exists for this date');
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
    res.status(400);
    throw new Error('Invalid appointment data');
  }
});

// @desc    Update an appointment
// @route   PUT /api/appointments/:id
// @access  Public
const updateAppointment = asyncHandler(async (req: Request, res: Response) => {
  const appointment = await Appointment.findById(req.params.id);
  if (appointment) {
    appointment.title = req.body.title || appointment.title;
    appointment.participant = req.body.participant || appointment.participant;
    appointment.participantPhoneNumber =
      req.body.participantPhoneNumber || appointment.participantPhoneNumber;
    appointment.date = req.body.date || appointment.participantPhoneNumber;

    const updatedAppointment = await appointment.save();

    res.json({
      _id: updatedAppointment._id,
      participant: updatedAppointment.participant,
      participantPhoneNumber: updatedAppointment.participantPhoneNumber,
      date: updatedAppointment.date,
    });
  } else {
    res.status(404);
    throw new Error('Appointment not found');
  }
});

// @desc    Delete an appointment
// @route   DELETE /api/appointments/:id
// @access  Public
const deleteAppointment = asyncHandler(async (req: Request, res: Response) => {
  const appointment = await Appointment.findById(req.params.id);
  if (appointment) {
    await User.deleteOne({ _id: appointment._id });
    res.json({ message: 'Appointment deleted' });
  } else {
    res.json('Appointment not found');
  }
});

export {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
