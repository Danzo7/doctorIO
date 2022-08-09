import { AppointmentQueueItem } from '@models/instance.model';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'AppointmentQueueApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'localhost:3000/queue' }),
  endpoints: (builder) => ({
    createQueue: builder.mutation({
      query: (roleId: number) => ({ url: `/${roleId}`, method: 'POST' }),
    }),
    getQueueInfo: builder.query({ query: (roleId) => `/${roleId}` }),
    deleteQueue: builder.mutation({
      query: (roleId: number) => ({ url: `/${roleId}`, method: 'DELETE' }),
    }),
    getAppointments: builder.query({ query: (roleId) => `/${roleId}/item` }),
    addAppointment: builder.mutation({
      query: (data: { roleId: number; body: AppointmentQueueItem }) => {
        const { roleId, body } = data;
        return {
          url: `/${roleId}/item`,
          method: 'POST',
          body: body,
        };
      },
    }),
    deleteAppointment: builder.mutation({
      query: (data: { roleId: number; body: AppointmentQueueItem }) => {
        const { roleId, body } = data;
        return {
          url: `/${roleId}/item`,
          method: 'DELETE',
          body: body,
        };
      },
    }),
    getQueueState: builder.query({ query: (roleId) => `/${roleId}/state` }),
    changeQueueState: builder.mutation({
      query: (data: { roleId: number; body: any }) => {
        const { roleId, body } = data;
        return { url: `/${roleId}/state`, method: 'PATCH', body: body };
      },
    }),
  }),
});

export const {
  useGetQueueInfoQuery,
  useCreateQueueMutation,
  useDeleteQueueMutation,
  useGetAppointmentsQuery,
  useAddAppointmentMutation,
  useDeleteAppointmentMutation,
  useGetQueueStateQuery,
  useChangeQueueStateMutation,
} = api;
