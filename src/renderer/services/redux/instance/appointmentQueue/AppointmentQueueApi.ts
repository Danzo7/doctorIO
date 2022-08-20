import {
  AppointmentQueue,
  AppointmentQueueItem,
  Drug,
  QueueState,
  Test,
} from '@models/instance.model';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { parseISO } from 'date-fns';
import appointmentApi from '../Appointment/AppointmentApi';

const appointmentQueueApi = createApi({
  reducerPath: 'AppointmentQueueApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/queue' }),
  tagTypes: ['state', 'queue', 'item'],
  endpoints: (builder) => ({
    //GET
    getQueueInfo: builder.query<AppointmentQueue, number>({
      query: (roleId) => `/${roleId}`,
      providesTags: ['state', 'queue', 'item'],
      transformResponse: (
        response: Omit<AppointmentQueue, 'appointments'> & {
          appointments: (Omit<AppointmentQueueItem, 'date'> & {
            date: string;
          })[];
        },
      ) => {
        const transformedApp = response.appointments.map(
          ({ date, ...other }) => ({
            ...other,
            date: parseISO(date),
          }),
        );

        return { ...response, appointments: transformedApp };
      },
    }), //Avoid using this endpoint
    getQueueAppointments: builder.query<AppointmentQueueItem[], number>({
      query: (roleId) => `/${roleId}/item`,
      providesTags: ['item'],
      transformResponse: (
        response: (Omit<AppointmentQueueItem, 'date'> & { date: string })[],
      ) => {
        return response.map(({ date, ...other }) => ({
          ...other,
          date: parseISO(date),
        }));
      },
    }),
    getQueueState: builder.query<QueueState, number>({
      query: (roleId) => `/${roleId}/state`,
      providesTags: ['state'],
    }),
    getIsQueueOwner: builder.query<boolean, number>({
      query: (roleId) => `/${roleId}/ownership`,
    }),
    getNextQueueItem: builder.query<AppointmentQueueItem, number>({
      query: (roleId) => `/${roleId}/item/next`,
      providesTags: ['state', 'item'],
      transformResponse: (
        response: Omit<AppointmentQueueItem, 'date'> & { date: string },
      ) => {
        return { ...response, date: parseISO(response.date) };
      },
    }),
    //POST
    createQueue: builder.mutation<AppointmentQueue, number>({
      query: (roleId: number) => ({ url: `/${roleId}`, method: 'POST' }),
      invalidatesTags: ['state', 'queue', 'item'],
    }),
    addQueueAppointment: builder.mutation<
      AppointmentQueueItem[],
      {
        roleId: number;
        body: { patientId: number; test?: Partial<Test> };
      }
    >({
      query: ({ roleId, body }) => {
        return {
          url: `/${roleId}/item`,
          method: 'POST',
          body: body,
        };
      },
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
      invalidatesTags: ['item'], //REDUX update test on both comp of queue item wide
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
    progressQueueState: builder.mutation({
      query: (data: { roleId: number; position: number }) => ({
        url: `/${data.roleId}/state/progress`,
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
    endNext: builder.mutation<
      QueueState,
      {
        roleId: number;
        body: {
          diagnosis: string;
          subject?: string;
          prescription: Omit<Drug, 'id'>[];
        };
      }
    >({
      query: ({ roleId, body }) => ({
        url: `/${roleId}/state/end/next`,
        method: 'PATCH',
        body: { ...body },
      }),
      invalidatesTags: ['state', 'item'],
    }),
    //DELETE
    resetQueue: builder.mutation<AppointmentQueue, number>({
      query: (roleId: number) => ({ url: `/${roleId}`, method: 'DELETE' }),
      invalidatesTags: ['state', 'queue', 'item'],
    }),
    deleteAppointment: builder.mutation<
      AppointmentQueueItem[],
      { roleId: number; appointmentId: number }
    >({
      query: ({ roleId, appointmentId }) => {
        return {
          url: `/${roleId}/item?appointmentId=${appointmentId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['item'],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(appointmentApi.util.invalidateTags(['BookAppointment']));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});
export default appointmentQueueApi;
export const {
  useGetQueueInfoQuery,
  useGetNextQueueItemQuery,
  useCreateQueueMutation,
  useResetQueueMutation,
  useGetQueueAppointmentsQuery,
  useAddQueueAppointmentMutation,
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
  useGetIsQueueOwnerQuery,
  useProgressQueueStateMutation,
} = appointmentQueueApi;
