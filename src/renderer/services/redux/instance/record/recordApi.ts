import { MedicalHistory, Patient, PatientBrief } from '@models/instance.model';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'recordApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/record',
  }),
  tagTypes: ['patient', 'MedicalHistory'],
  endpoints: (builder) => ({
    //Patient
    //GET
    getPatient: builder.query<PatientBrief, number>({
      query: (patId) => `/patient?id=${patId}`,
    }),
    getPatients: builder.query<PatientBrief, any>({
      query: () => `/patient`,
      providesTags: ['patient'],
    }),
    findPatientByName: builder.mutation<PatientBrief[], string>({
      query: (name: string) => ({
        url: `/patient/find?name=${name}`,
        method: 'GET',
      }),
    }),
    findPatientByName2: builder.query<PatientBrief[], string>({
      query: (name: string) => `/patient/find?name=${name}`,
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
    //MedicalHistory
    //GET
    getMedicalHistory: builder.query<MedicalHistory[], number>({
      query: (patId) => `/history?patientId=${patId}`,
      providesTags: ['MedicalHistory'],
    }),
    //POST
    addMedicalHistory: builder.mutation<
      MedicalHistory[],
      { patientId: number; body: { date: Date; description: string } }
    >({
      query: ({ patientId, body }) => ({
        url: `/history?patientId=${patientId}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['MedicalHistory'],
    }),
  }),
});
export default api;
export const {
  useGetPatientQuery,
  useGetPatientsQuery,
  useFindPatientByNameMutation,
  useGetPatientDetailQuery,
  useLazyFindPatientByName2Query,
  useGetMedicalHistoryQuery,
  useAddPatientMutation,
  useAddMedicalHistoryMutation,
  useFindPatientByName2Query,
} = api;
