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
      query: (name) => `/patient/find?name=${name}`,
    }),
    getPatientDetail: builder.query<Patient, number>({
      query: (patId) => `patient/detail?id=${patId}`,
    }),
    //POST
  }),
});
export const {
  useGetPatientQuery,
  useGetPatientsQuery,
  useFindPatientByNameQuery,
  useGetPatientDetailQuery,
} = api;
