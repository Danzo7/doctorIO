import { MedicalHistory } from '@models/instance.model';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { parseISO } from 'date-fns';

const medicalHistoryApi = createApi({
  reducerPath: 'medicalHistoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/record/history',
  }),
  tagTypes: ['MedicalHistory'],
  endpoints: (builder) => ({
    getMedicalHistory: builder.query<MedicalHistory[], number>({
      transformResponse: (
        response: (Omit<MedicalHistory, 'date'> & { date: string })[],
      ) => {
        return response.map((item) => {
          return {
            ...item,
            date: parseISO(item.date),
          };
        });
      },

      query: (patId) => `?patientId=${patId}`,
      providesTags: ['MedicalHistory'],
    }),
    //POST
    addMedicalHistory: builder.mutation<
      MedicalHistory[],
      { patientId: number; body: { date: Date; description: string } }
    >({
      query: ({ patientId, body }) => ({
        url: `?patientId=${patientId}`,
        method: 'POST',
        body: { ...body },
      }),
      invalidatesTags: ['MedicalHistory'],
    }),
  }),
});
export default medicalHistoryApi;
export const { useGetMedicalHistoryQuery, useAddMedicalHistoryMutation } =
  medicalHistoryApi;
