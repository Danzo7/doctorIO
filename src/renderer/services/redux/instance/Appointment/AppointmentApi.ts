import { Appointment, BookedAppointment } from '@models/instance.model';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { parseISO } from 'date-fns';

const appointmentApi = createApi({
  reducerPath: 'AppointmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/record/appointment',
  }),
  tagTypes: ['BookAppointment'],
  endpoints: (builder) => ({
    //GET
    getBookedAppointment: builder.query<BookedAppointment[], null>({
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
    }),
    bookAppointment: builder.mutation<
      Appointment,
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
    // setAppointmentDone :builder.mutation<>
  }),
});

export default appointmentApi;
export const {
  useGetBookedAppointmentQuery,
  useBookAppointmentMutation,
  useGetPatientAppointmentsQuery,
} = appointmentApi;
