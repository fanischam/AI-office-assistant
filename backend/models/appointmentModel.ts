import mongoose, { Document } from 'mongoose';

interface IAppointment extends Document {
  title: string;
  participant: string;
  participantPhoneNumber: number;
  date: Date;
  user: mongoose.Schema.Types.ObjectId;
}

const appointmentSchema = new mongoose.Schema<IAppointment>(
  {
    title: {
      type: String,
      required: true,
    },
    participant: {
      type: String,
      required: true,
    },
    participantPhoneNumber: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model<IAppointment>(
  'Appointment',
  appointmentSchema
);

export default Appointment;
