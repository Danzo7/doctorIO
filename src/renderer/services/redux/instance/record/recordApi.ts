import { Patient, PatientBrief } from '@models/instance.model';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'recordApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/record',
  }),
  tagTypes: ['patient'],
  endpoints: (builder) => ({
    //Patient
    //GET
    getPatient: builder.query<PatientBrief, number>({
      query: (patId) => `/patient?id=${patId}`,
    }),
    getPatients: builder.query<PatientBrief, any>({
      query: () => `/patient`,
    }),
    findPatientByName: builder.query<PatientBrief[], string>({
      query: (name: string) => `/patient/find?name=${name}`,
      keepUnusedDataFor: 0,
    }),
    getPatientDetail: builder.query<Patient, number>({
      query: (patId) => `patient/detail?id=${patId}`,
    }),
    //POST
    addPatient: builder.mutation<
      Patient,
      {
        firstName: string;
        lastName: string;
        birthDate: Date;
        registerDate: Date;
        sex: 'male' | 'female';
        age: number;
      }
    >({
      query: (body) => ({ url: `/patient`, method: 'POST', body: body }),
      invalidatesTags: ['patient'],
    }),
  }),
});
export default api;
export const {
  useGetPatientQuery,
  useGetPatientsQuery,
  useFindPatientByNameQuery,
  useGetPatientDetailQuery,
} = api;
