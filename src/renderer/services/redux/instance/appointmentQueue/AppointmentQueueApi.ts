import {
  AppointmentQueue,
  AppointmentQueueItem,
  Drug,
  QueueState,
  BiometricScreening,
} from '@models/instance.model';
import { StaticQueries } from '@redux/dynamic_queries';
import { createApi } from '@reduxjs/toolkit/query/react';
import { parseISO } from 'date-fns';

const appointmentQueueApi = createApi({
  reducerPath: 'AppointmentQueueApi',
  baseQuery: StaticQueries.queue.query,
  tagTypes: ['state', 'queue', 'item'],
  endpoints: (builder) => ({
    //GET
    getQueueInfo: builder.query<AppointmentQueue, number>({
      query: (selectedQueue) => {
        return {
          url: ``,
          params: { selectedQueue },
        };
      },
      transformResponse: (
        response: Omit<AppointmentQueue, 'appointments' | 'selected'> & {
          selected?: Omit<AppointmentQueueItem, 'date'> & { date: string };
          appointments: (Omit<AppointmentQueueItem, 'date'> & {
            date: string;
          })[];
        },
      ) => {
        const transformedSelected = response.selected
          ? {
              ...response.selected,
              date: parseISO(response.selected.date),
            }
          : undefined;
        const transformedApp = response.appointments.map(
          ({ date, ...other }) => ({
            ...other,
            date: parseISO(date),
          }),
        );

        return {
          ...response,
          appointments: transformedApp,
          selected: transformedSelected,
        };
      },
    }), //Avoid using this endpoint
    getQueueAppointments: builder.query<AppointmentQueueItem[], number>({
      query: (selectedQueue) => {
        return {
          url: `/item`,
          params: { selectedQueue },
        };
      },

      providesTags: ['item', 'queue'],
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
      query: (selectedQueue) => {
        return {
          url: `/state`,
          params: { selectedQueue },
        };
      },

      providesTags: ['state', 'queue'],
      transformResponse: ({
        selected,
        ...response
      }: QueueState): QueueState => {
        return {
          ...response,
          selected: selected
            ? {
                ...selected,
                date: parseISO(selected.date as any as string),
              }
            : undefined,
        };
      },
    }),
    getIsQueueOwner: builder.query<boolean, number>({
      providesTags: ['queue'],

      query: (selectedQueue) => {
        return {
          url: `/ownership`,
          params: { selectedQueue },
        };
      },
    }),
    getNextQueueItem: builder.query<AppointmentQueueItem, number>({
      query: (selectedQueue) => {
        return {
          url: `/item/next`,
          params: { selectedQueue },
        };
      },

      providesTags: ['queue'],
      transformResponse: (
        response: Omit<AppointmentQueueItem, 'date'> & { date: string },
      ) => {
        return { ...response, date: parseISO(response.date) };
      },
    }),
    addQueueAppointment: builder.mutation<
      AppointmentQueueItem[],
      {
        selectedQueue: number;
        body: { patientId: number; vitals?: Partial<BiometricScreening> };
      }
    >({
      query: ({ selectedQueue, body }) => {
        return {
          url: `/item`,
          method: 'POST',
          body: { ...body },
          params: { selectedQueue },
        };
      },
    }),
    //PATCH
    updateTest: builder.mutation<
      boolean,
      {
        selectedQueue: number;
        body: { position: number; vitals: BiometricScreening };
      }
    >({
      query: ({ selectedQueue, body }) => {
        return {
          url: `/item`,
          method: 'PATCH',
          body: { ...body },
          params: { selectedQueue },
        };
      },
    }),
    updateQueueState: builder.mutation<
      boolean,
      {
        selectedQueue: number;
        body: {
          state: 'IDLE' | 'WAITING' | 'IN_PROGRESS' | 'PAUSED';
          position?: number;
        };
      }
    >({
      query: ({ selectedQueue, body }) => {
        return {
          url: `/state`,
          method: 'PATCH',
          body: { ...body },
          params: {
            selectedQueue,
          },
        };
      },
    }),
    pauseQueue: builder.mutation<boolean, number>({
      query: (selectedQueue) => ({
        url: `/state/pause`,
        method: 'PATCH',
        params: { selectedQueue },
      }),
    }),
    resumeQueue: builder.mutation<boolean, number>({
      query: (selectedQueue) => ({
        url: `/state/idle`,
        method: 'PATCH',
        params: { selectedQueue },
      }),
    }),
    notifyQueue: builder.mutation<
      boolean,
      { selectedQueue: number; position: number }
    >({
      query: ({ selectedQueue, position }) => ({
        url: `/state/notify`,
        method: 'PATCH',
        body: { position: position },
        params: { selectedQueue },
      }),
    }),
    progressQueueState: builder.mutation<
      boolean,
      { selectedQueue: number; position: number }
    >({
      query: ({ selectedQueue, position }) => ({
        url: `/state/progress`,
        method: 'PATCH',
        body: { position: position },
        params: { selectedQueue },
      }),
    }),
    notifyNext: builder.mutation<boolean, number>({
      query: (selectedQueue) => ({
        url: `/state/notify/next`,
        method: 'PATCH',
        params: { selectedQueue },
      }),
    }),
    startNext: builder.mutation<boolean, number>({
      query: (selectedQueue) => ({
        url: `/state/start/next`,
        method: 'PATCH',
        params: { selectedQueue },
      }),
    }),
    endNext: builder.mutation<
      QueueState,
      {
        selectedQueue: number;
        body: {
          diagnosis?: string;
          subject?: string;
          prescription?: Omit<Drug, 'id'>[];
          payment?: number;
        };
      }
    >({
      query: ({ selectedQueue, body }) => ({
        url: `/state/end/next`,
        method: 'PATCH',
        body: { ...body },
        params: { selectedQueue },
      }),
    }),
    //DELETE
    resetQueue: builder.mutation<boolean, number>({
      query: (selectedQueue) => ({
        url: ``,
        method: 'DELETE',
        params: { selectedQueue },
      }),
    }),
    deleteAppointment: builder.mutation<
      AppointmentQueueItem[],
      { selectedQueue: number; appointmentId: number }
    >({
      query: ({ selectedQueue, appointmentId }) => {
        return {
          url: `/item`,
          method: 'DELETE',
          params: { appointmentId, selectedQueue },
        };
      },
    }),
  }),
});
export default appointmentQueueApi;
export const {
  useGetNextQueueItemQuery,
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
