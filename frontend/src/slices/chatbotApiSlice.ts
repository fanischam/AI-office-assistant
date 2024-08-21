import { CHATBOT_URL } from '../constants';
import BuilderType from '../types/BuilderType';
import { apiSlice } from './apiSlice';

export const chatbotApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: BuilderType) => ({
    sendPrompt: builder.mutation({
      query: (data) => ({
        url: `${CHATBOT_URL}/prompt`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useSendPromptMutation } = chatbotApiSlice;
