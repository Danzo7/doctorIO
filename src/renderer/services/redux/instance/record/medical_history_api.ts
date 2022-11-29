import { MedicalHistory } from '@models/instance.model';
import { StaticQueries } from '@redux/dynamic_queries';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { parseISO } from 'date-fns';

const medicalHistoryApi = createApi({
  reducerPath: 'medicalHistoryApi',
  baseQuery: StaticQueries.medicalHistory.query,

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

      query: (patientId) => {
        return {
          url: '',
          params: { patientId },
        };
      },

      providesTags: ['MedicalHistory'],
    }),
    //POST
    addMedicalHistory: builder.mutation<
      MedicalHistory[],
      { patientId: number; body: { date: Date; description: string } }
    >({
      query: ({ patientId, body }) => ({
        url: ``,
        method: 'POST',
        body: { ...body },
        params: { patientId },
      }),
      invalidatesTags: ['MedicalHistory'],
    }),
  }),
});
export default medicalHistoryApi;
export const { useGetMedicalHistoryQuery, useAddMedicalHistoryMutation } =
  medicalHistoryApi;
