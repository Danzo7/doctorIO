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
    //GET
    getQueueInfo: builder.query<AppointmentQueue, number>({
      query: (roleId) => `/${roleId}`,
      providesTags: ['state', 'queue', 'item'],
    }), //Avoid using this endpoint
    getAppointments: builder.query<AppointmentQueueItem[], number>({
      query: (roleId) => `/${roleId}/item`,
      providesTags: ['item'],
    }),
    getQueueState: builder.query({
      query: (roleId) => `/${roleId}/state`,
      providesTags: ['state'],
    }),
    getNextQueueItem: builder.query({
      query: (roleId) => `/${roleId}/item/next`,
      providesTags: ['state', 'item'],
    }),
    //POST
    createQueue: builder.mutation<AppointmentQueue, number>({
      query: (roleId: number) => ({ url: `/${roleId}`, method: 'POST' }),
      invalidatesTags: ['state', 'queue', 'item'],
    }),
    addAppointment: builder.mutation<
      AppointmentQueueItem[],
      {
        roleId: number;
        body: { patientId: number } & Partial<Test>;
      }
    >({
      query: ({ roleId, body }) => {
        return {
          url: `/${roleId}/item`,
          method: 'POST',
          body: body,
        };
      }, //TODO fix body type to createItemDto from backend
      invalidatesTags: ['item'],
    }),
    //PATCH
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
    updateQueueState: builder.mutation({
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
        body: { position: data.position },
      }),
      invalidatesTags: ['state'],
    }),
    notifyNext: builder.mutation({
      query: (roleId: number) => ({
        url: `/${roleId}/state/notify/next`,
        method: 'PATCH',
      }),
      invalidatesTags: ['state'],
    }),
    startNext: builder.mutation({
      query: (roleId: number) => ({
        url: `/${roleId}/state/start/next`,
        method: 'PATCH',
      }),
      invalidatesTags: ['state'],
    }),
    endNext: builder.mutation({
      query: (roleId: number) => ({
        url: `/${roleId}/state/end/next`,
        method: 'PATCH',
      }),
      invalidatesTags: ['state'],
    }),
    //DELETE
    resetQueue: builder.mutation<AppointmentQueue, number>({
      query: (roleId: number) => ({ url: `/${roleId}`, method: 'DELETE' }),
      invalidatesTags: ['state', 'queue', 'item'],
    }),
    deleteAppointment: builder.mutation<
      AppointmentQueueItem[],
      { roleId: number; position: number }
    >({
      query: ({ roleId, position }) => {
        return {
          url: `/${roleId}/item`,
          method: 'DELETE',
          body: { position: position },
        };
      },
      invalidatesTags: ['item'],
    }),
  }),
});

export const {
  useGetQueueInfoQuery,
  useGetNextQueueItemQuery,
  useCreateQueueMutation,
  useResetQueueMutation,
  useGetAppointmentsQuery,
  useAddAppointmentMutation,
  useUpdateTestMutation,
  useDeleteAppointmentMutation,
  useGetQueueStateQuery,
  useUpdateQueueStateMutation,
  usePauseQueueMutation,
  useResumeQueueMutation,
  useNotifyQueueMutation,
  useNotifyNextMutation,
  useStartNextMutation,
  useEndNextMutation,
} = api;
