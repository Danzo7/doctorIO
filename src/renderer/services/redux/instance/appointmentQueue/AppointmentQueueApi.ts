import {
  AppointmentQueue,
  AppointmentQueueItem,
  Test,
} from '@models/instance.model';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'AppointmentQueueApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/queue' }),
  tagTypes: ['state', 'queue', 'item'],
  endpoints: (builder) => ({
    createQueue: builder.mutation({
      query: (roleId: number) => ({ url: `/${roleId}`, method: 'POST' }),
      invalidatesTags: ['state', 'queue', 'item'],
    }),
    deleteQueue: builder.mutation({
      query: (roleId: number) => ({ url: `/${roleId}`, method: 'DELETE' }),
      invalidatesTags: ['state', 'queue', 'item'],
    }),
    getQueueInfo: builder.query<AppointmentQueue, number>({
      query: (roleId) => `/${roleId}`,
      providesTags: ['state', 'queue', 'item'],
    }),

    getAppointments: builder.query({
      query: (roleId) => `/${roleId}/item`,
      providesTags: ['item'],
    }),
    addAppointment: builder.mutation({
      query: (data: { roleId: number; body: number }) => {
        const { roleId, body } = data;
        return {
          url: `/${roleId}/item`,
          method: 'POST',
          body: { patientId: body },
        };
      },
      invalidatesTags: ['state', 'item'],
    }),
    deleteAppointment: builder.mutation({
      query: (data: { roleId: number; position: number }) => {
        const { roleId, position } = data;
        return {
          url: `/${roleId}/item`,
          method: 'DELETE',
          body: { position: position },
        };
      },
      invalidatesTags: ['item'],
    }),
    updateTest: builder.mutation({
      query: (data: { roleId: number; position: number; test: Test }) => {
        const { roleId, position, test } = data;
        return {
          url: `/${roleId}/item`,
          method: 'PATCH',
          body: { position: position, ...test },
        };
      },
      invalidatesTags: ['item'],
    }),
    getQueueState: builder.query({
      query: (roleId) => `/${roleId}/state`,
      providesTags: ['state'],
    }),
    changeQueueState: builder.mutation({
      query: (data: { roleId: number; body: any }) => {
        const { roleId, body } = data;
        return { url: `/${roleId}/state`, method: 'PATCH', body: body };
      },
      invalidatesTags: ['state'],
    }),
    pauseQueue: builder.mutation({
      query: (roleId: number) => ({
        url: `/${roleId}/state/pause`,
        method: 'PATCH',
      }),
      invalidatesTags: ['state'],
    }),
    resumeQueue: builder.mutation({
      query: (roleId: number) => ({
        url: `/${roleId}/state/idle`,
        method: 'PATCH',
      }),
      invalidatesTags: ['state'],
    }),
    notifyQueue: builder.mutation({
      query: (data: { roleId: number; position: number }) => ({
        url: `/${data.roleId}/state/notify`,
        method: 'PATCH',
        body: data.position,
      }),
      invalidatesTags: ['state'],
    }),
  }),
});

export const {
  useGetQueueInfoQuery,
  useCreateQueueMutation,
  useDeleteQueueMutation,
  useGetAppointmentsQuery,
  useAddAppointmentMutation,
  useUpdateTestMutation,
  useDeleteAppointmentMutation,
  useGetQueueStateQuery,
  useChangeQueueStateMutation,
  usePauseQueueMutation,
  useResumeQueueMutation,
  useNotifyQueueMutation,
} = api;
