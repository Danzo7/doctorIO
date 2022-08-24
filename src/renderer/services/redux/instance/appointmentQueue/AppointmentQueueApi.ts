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
import appointmentApi from '../Appointment/AppointmentApi';

const appointmentQueueApi = createApi({
  reducerPath: 'AppointmentQueueApi',
  baseQuery: StaticQueries.queue.query,
  tagTypes: ['state', 'queue', 'item'],
  endpoints: (builder) => ({
    //GET
    getQueueInfo: builder.query<AppointmentQueue, number>({
      query: (roleId) => `/${roleId}`,
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
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(appointmentApi.util.invalidateTags(['BookAppointment']));
        } catch (err) {
          //console.log(err);
        }
      },
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
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(appointmentApi.util.invalidateTags(['BookAppointment']));
        } catch (err) {
          //console.log(err);
        }
      },
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
      invalidatesTags: ['item', 'state'],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(appointmentApi.util.invalidateTags(['BookAppointment']));
        } catch (err) {
          //console.log(err);
        }
      },
    }),
  }),
});
export default appointmentQueueApi;
export const {
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
