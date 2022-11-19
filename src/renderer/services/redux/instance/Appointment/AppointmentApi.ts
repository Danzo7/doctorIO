import {
  Appointment,
  BookedAppointment,
  Drug,
  BiometricScreening,
} from '@models/instance.model';
import { StaticQueries } from '@redux/dynamic_queries';
import { createApi } from '@reduxjs/toolkit/query/react';
import { parseISO } from 'date-fns';

const appointmentApi = createApi({
  reducerPath: 'AppointmentApi',
  baseQuery: StaticQueries.appointment.query,
  tagTypes: ['booked', 'payment'],
  endpoints: (builder) => ({
    //GET
    getBookedAppointment: builder.query<BookedAppointment[], void>({
      query: () => `/book`,
      providesTags: ['booked'],
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
      providesTags: ['booked'],
    }),
    getPayments: builder.query<
      { appointmentId: number; name: string; amount: number; date: Date }[],
      void
    >({ query: () => '/payment', providesTags: ['payment'] }),

    confirmPayment: builder.mutation<Appointment, number>({
      query: (id) => {
        return { url: `/payment?id=${id}`, method: 'DELETE' };
      },
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
    }),
    //PATCH
    setAppointmentDone: builder.mutation<
      void,
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
    }),
    AssignAppointmentToQueue: builder.mutation<
      true,
      { appointmentId: number; test?: BiometricScreening }
    >({
      query: ({ appointmentId, test }) => {
        return {
          url: `/assign?id=${appointmentId}`,
          method: 'PATCH',
          body: { ...test },
        };
      },
    }),
    cancelAppointment: builder.mutation<void, number>({
      query: (appointmentId) => {
        return {
          url: `/cancel?id=${appointmentId}`,
          method: 'PATCH',
        };
      },
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
