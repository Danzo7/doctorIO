import {
  AppointmentQueue,
  AppointmentQueueItem,
  Drug,
  QueueState,
  Test,
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
    getQueueInfo: builder.query<AppointmentQueue, void>({
      query: () => ``,
      providesTags: ['state', 'queue', 'item'],
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
              date: parseISO(response.selected?.date),
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
    getQueueAppointments: builder.query<AppointmentQueueItem[], void>({
      query: () => `/item`,
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
    getQueueState: builder.query<QueueState, void>({
      query: () => `/state`,
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
    getIsQueueOwner: builder.query<boolean, void>({
      providesTags: ['queue'],

      query: () => `/ownership`,
    }),
    getNextQueueItem: builder.query<AppointmentQueueItem, void>({
      query: () => `/item/next`,
      providesTags: ['queue'],
      transformResponse: (
        response: Omit<AppointmentQueueItem, 'date'> & { date: string },
      ) => {
        return { ...response, date: parseISO(response.date) };
      },
    }),
    addQueueAppointment: builder.mutation<
      AppointmentQueueItem[],
      { patientId: number; test?: Partial<Test> }
    >({
      query: (body) => {
        return {
          url: `/item`,
          method: 'POST',
          body: { ...body },
        };
      },
    }),
    //PATCH
    updateTest: builder.mutation<boolean, { position: number } & Test>({
      query: (body) => {
        return {
          url: `/item`,
          method: 'PATCH',
          body: { ...body },
        };
      },
    }),
    updateQueueState: builder.mutation<
      boolean,
      {
        state: 'IDLE' | 'WAITING' | 'IN_PROGRESS' | 'PAUSED';
        position?: number;
      }
    >({
      query: (body) => {
        return { url: `/state`, method: 'PATCH', body: { ...body } };
      },
    }),
    pauseQueue: builder.mutation<boolean, void>({
      query: () => ({
        url: `/state/pause`,
        method: 'PATCH',
      }),
    }),
    resumeQueue: builder.mutation<boolean, void>({
      query: () => ({
        url: `/state/idle`,
        method: 'PATCH',
      }),
    }),
    notifyQueue: builder.mutation<boolean, number>({
      query: (position) => ({
        url: `/state/notify`,
        method: 'PATCH',
        body: { position: position },
      }),
    }),
    progressQueueState: builder.mutation<boolean, number>({
      query: (position) => ({
        url: `/state/progress`,
        method: 'PATCH',
        body: { position: position },
      }),
    }),
    notifyNext: builder.mutation<boolean, void>({
      query: () => ({
        url: `/state/notify/next`,
        method: 'PATCH',
      }),
    }),
    startNext: builder.mutation<boolean, void>({
      query: () => ({
        url: `/state/start/next`,
        method: 'PATCH',
      }),
    }),
    endNext: builder.mutation<
      QueueState,
      {
        diagnosis: string;
        subject?: string;
        prescription: Omit<Drug, 'id'>[];
        payment?: number;
      }
    >({
      query: (body) => ({
        url: `/state/end/next`,
        method: 'PATCH',
        body: { ...body },
      }),
    }),
    //DELETE
    resetQueue: builder.mutation<AppointmentQueue, number>({
      query: () => ({ url: ``, method: 'DELETE' }),
    }),
    deleteAppointment: builder.mutation<
      AppointmentQueueItem[],
      { roleId: number; appointmentId: number }
    >({
      query: ({ appointmentId }) => {
        return {
          url: `/item?appointmentId=${appointmentId}`,
          method: 'DELETE',
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
