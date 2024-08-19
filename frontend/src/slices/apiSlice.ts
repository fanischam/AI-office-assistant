import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';
import BuilderType from '../types/BuilderType';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extra) => {
  let result = await baseQuery(args, api, extra);
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  tagTypes: ['User'],
  endpoints: (builder: BuilderType) => ({}),
});
