import { USERS_URL } from '../constants';
import BuilderType from '../types/BuilderType';
import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: BuilderType) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = usersApiSlice;
