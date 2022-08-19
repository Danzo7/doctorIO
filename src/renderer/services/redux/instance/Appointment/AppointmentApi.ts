import { Appointment_v2, BookedAppointment } from '@models/instance.model';
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
      Appointment_v2,
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
        body: { diagnosis: string; subject?: string; prescription: Drug[] };
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
  }),
});

export default appointmentApi;
export const {
  useGetBookedAppointmentQuery,
  useBookAppointmentMutation,
  useSetAppointmentDoneMutation,
} = appointmentApi;
