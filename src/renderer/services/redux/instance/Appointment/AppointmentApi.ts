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
export const { useGetBookedAppointmentQuery, useBookAppointmentMutation } =
  appointmentApi;
