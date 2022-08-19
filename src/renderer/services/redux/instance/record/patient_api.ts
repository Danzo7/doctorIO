import { Patient, PatientBrief } from '@models/instance.model';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const patientApi = createApi({
  reducerPath: 'recordApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/record',
  }),
  tagTypes: ['patient', 'MedicalHistory', 'MedicalDocument'],
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
      PatientBrief,
      {
        firstName: string;
        lastName: string;
        birthDate: Date;
        sex: 'male' | 'female';
      }
    >({
      query: (body) => ({ url: `/patient`, method: 'POST', body: body }),
      invalidatesTags: ['patient'],
    }),
    //MedicalHistory
    //GET

    //documentService
    //GET
  }),
});
export default patientApi;
export const {
  useGetPatientQuery,
  useGetPatientsQuery,
  useFindPatientByNameMutation,
  useGetPatientDetailQuery,
  useLazyFindPatientByName2Query,
  useAddPatientMutation,
  useFindPatientByName2Query,
} = patientApi;
