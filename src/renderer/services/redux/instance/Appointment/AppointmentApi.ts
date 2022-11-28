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
    getBookedAppointment: builder.query<BookedAppointment[], number>({
      query: (queueIndex) =>
        `/book` + (queueIndex ? `?selectedQueue=${queueIndex}` : ''),
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
      number
    >({
      query: (queueIndex) =>
        '/payment' + (queueIndex ? `?selectedQueue=${queueIndex}` : ''),
      providesTags: ['payment'],
    }),

    confirmPayment: builder.mutation<Appointment, number>({
      query: (id) => {
        return { url: `/payment`, method: 'DELETE', params: { id } };
      },
    }),

    bookAppointment: builder.mutation<
      any,
      {
        selectedQueue: number;
        patientId: number;
        body: { date: Date; subject?: string };
      }
    >({
      query: ({ selectedQueue, patientId, body }) => {
        return {
          url: `/book`,
          method: 'POST',
          body: { ...body },
          params: { patientId, selectedQueue },
        };
      },
    }),
    //PATCH
    setAppointmentDone: builder.mutation<
      void,
      {
        selectedQueue: number;
        id: number;
        body: {
          diagnosis: string;
          subject?: string;
          prescription: Omit<Drug, 'id'>[];
        };
      }
    >({
      query: ({ selectedQueue, id, body }) => {
        return {
          url: ``,
          body: { ...body },
          method: 'PATCH',
          params: { id, selectedQueue },
        };
      },
    }),
    AssignAppointmentToQueue: builder.mutation<
      true,
      {
        selectedQueue: number;
        id: number;
        test?: BiometricScreening;
      }
    >({
      query: ({ selectedQueue, id, test }) => {
        return {
          url: `/assign`,
          method: 'PATCH',
          body: { ...test },
          params: { id, selectedQueue },
        };
      },
    }),
    cancelAppointment: builder.mutation<void, number>({
      query: (id) => {
        return {
          url: `/cancel`,
          method: 'PATCH',
          params: { id },
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
