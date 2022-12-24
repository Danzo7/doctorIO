import {
  Appointment,
  BookedAppointment,
  Drug,
  BiometricScreening,
  AppointmentBrief,
} from '@models/instance.model';
import { StaticQueries } from '@redux/dynamic_queries';
import { createApi } from '@reduxjs/toolkit/query/react';
import { parseISO } from 'date-fns';

const appointmentApi = createApi({
  reducerPath: 'AppointmentApi',
  baseQuery: StaticQueries.appointment.query,
  tagTypes: ['booked', 'payment'],
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  endpoints: (builder) => ({
    //GET
    getBookedAppointment: builder.query<BookedAppointment[], number>({
      query: (selectedQueue) => {
        return {
          url: `/book`,
          params: { selectedQueue },
        };
      },

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
    getPatientAppointments: builder.query<AppointmentBrief[], number>({
      query: (patientId: number) => {
        return {
          url: '',
          params: { patientId },
        };
      },

      transformResponse: (response: AppointmentBrief[]) => {
        return response.map(({ bookedFor, date, ...other }) => ({
          ...other,
          bookedFor: bookedFor
            ? parseISO(bookedFor as any as string)
            : undefined,
          date: date ? parseISO(date as any as string) : undefined,
        }));
      },
      providesTags: ['booked'],
    }),
    getAppointmentDetail: builder.query<Appointment, number>({
      query: (id: number) => {
        return {
          url: '/detail',
          params: { id },
        };
      },
      transformResponse: ({
        bookedFor,
        date,
        bookedIn,
        ...other
      }: Appointment) => ({
        ...other,
        bookedFor: bookedFor ? parseISO(bookedFor as any as string) : undefined,
        date: date ? parseISO(date as any as string) : undefined,
        bookedIn: parseISO(bookedIn as any as string),
      }),
    }),
    getPayments: builder.query<
      { appointmentId: number; name: string; amount: number; date: Date }[],
      number
    >({
      query: (selectedQueue) => {
        return {
          url: '/payment',
          params: { selectedQueue },
        };
      },

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
          body: { vitals: test },
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
  useGetAppointmentDetailQuery,
} = appointmentApi;
