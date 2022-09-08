import {
  Appointment,
  BookedAppointment,
  Drug,
  Test,
} from '@models/instance.model';
import { StaticQueries } from '@redux/dynamic_queries';
import { createApi } from '@reduxjs/toolkit/query/react';
import { parseISO } from 'date-fns';
import appointmentQueueApi from '../appointmentQueue/AppointmentQueueApi';

const appointmentApi = createApi({
  reducerPath: 'AppointmentApi',
  baseQuery: StaticQueries.appointment.query,
  tagTypes: ['BookAppointment', 'payment'],
  endpoints: (builder) => ({
    //GET
    getBookedAppointment: builder.query<BookedAppointment[], void>({
      query: () => `/book`,
      providesTags: ['BookAppointment'],
      transformResponse: (
        response: (Omit<BookedAppointment, 'bookedFor'> & {
          bookedFor: string;
        })[],
      ) => {
        return response.map(({ bookedFor, ...other }) => ({
          ...other,
          bookedFor: parseISO(bookedFor),
        }));
      },
    }),
    getPatientAppointments: builder.query<Appointment[], number>({
      query: (patientId: number) => `?patientId=${patientId}`,
      transformResponse: (response: Appointment[]) => {
        return response.map(({ bookedFor, date, bookedIn, ...other }) => ({
          ...other,
          bookedFor: bookedFor
            ? parseISO(bookedFor as any as string)
            : undefined,
          date: date ? parseISO(date as any as string) : undefined,
          bookedIn: parseISO(bookedIn as any as string),
        }));
      },
      providesTags: ['BookAppointment'],
    }),
    getPayments: builder.query<
      { appointmentId: number; name: string; amount: number; date: Date }[],
      void
    >({ query: () => '/payment', providesTags: ['payment'] }),

    confirmPayment: builder.mutation<Appointment, number>({
      query: (id) => {
        return { url: `/payment?id=${id}`, method: 'DELETE' };
      },
      invalidatesTags: ['payment'],
    }),

    bookAppointment: builder.mutation<
      any,
      { patientId: number; body: { date: Date; subject?: string } }
    >({
      query: ({ patientId, body }) => {
        return {
          url: `/book?patientId=${patientId}`,
          method: 'POST',
          body: { ...body },
        };
      },
      invalidatesTags: ['BookAppointment'],
    }),
    //PATCH
    setAppointmentDone: builder.mutation<
      Appointment,
      {
        appointmentId: number;
        body: {
          diagnosis: string;
          subject?: string;
          prescription: Omit<Drug, 'id'>[];
        };
      }
    >({
      query: ({ appointmentId, body }) => {
        return {
          url: `?id=${appointmentId}`,
          body: { ...body },
          method: 'PATCH',
        };
      },
      invalidatesTags: ['BookAppointment'],
    }),
    AssignAppointmentToQueue: builder.mutation<
      Appointment,
      { appointmentId: number; test?: Test }
    >({
      query: ({ appointmentId, test }) => {
        return {
          url: `/assign?id=${appointmentId}`,
          method: 'PATCH',
          body: { ...test },
        };
      },
      invalidatesTags: ['BookAppointment'],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(appointmentQueueApi.util.invalidateTags(['item']));
        } catch (err) {
          //console.log(err);
        }
      },
    }),
    cancelAppointment: builder.mutation<Appointment, number>({
      query: (appointmentId) => {
        return {
          url: `/cancel?id=${appointmentId}`,
          method: 'PATCH',
        };
      },
      invalidatesTags: ['BookAppointment'],
    }),
  }),
});

export default appointmentApi;
export const {
  useGetBookedAppointmentQuery,
  useBookAppointmentMutation,
  useGetPatientAppointmentsQuery,
  useSetAppointmentDoneMutation,
  useAssignAppointmentToQueueMutation,
  useCancelAppointmentMutation,
  useGetPaymentsQuery,
  useConfirmPaymentMutation,
} = appointmentApi;
