import { AppointmentQueueItem } from '@models/instance.model';
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
    getQueueInfo: builder.query({
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
      invalidatesTags: ['item'],
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
