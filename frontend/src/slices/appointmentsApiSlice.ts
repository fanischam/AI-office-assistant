import { apiSlice } from './apiSlice';
import { APPOINTMENTS_URL } from '../constants';
import BuilderType from '../types/BuilderType';

export const appointmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: BuilderType) => ({
    getAppointments: builder.query({
      query: () => ({
        url: `${APPOINTMENTS_URL}/`,
      }),
    }),
    createAppointment: builder.mutation({
      query: (newAppointment) => ({
        url: `${APPOINTMENTS_URL}/`,
        method: 'POST',
        body: newAppointment,
      }),
    }),
    updateAppointment: builder.mutation({
      query: ({ ...data }) => ({
        url: `${APPOINTMENTS_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteAppointment: builder.mutation({
      query: ({ id }) => ({
        url: `${APPOINTMENTS_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAppointmentsQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
} = appointmentsApiSlice;
