import { Patient, PatientBrief } from '@models/instance.model';
import { StaticQueries } from '@redux/dynamic_queries';
import { createApi } from '@reduxjs/toolkit/query/react';

const patientApi = createApi({
  reducerPath: 'patientApi',
  baseQuery: StaticQueries.patient.query,
  tagTypes: ['patient', 'MedicalHistory', 'MedicalDocument'],
  endpoints: (builder) => ({
    //Patient
    //GET
    getPatient: builder.query<PatientBrief, number>({
      query: (patId) => `?id=${patId}`,
    }),
    getPatients: builder.query<PatientBrief, any>({
      query: () => ``,
      providesTags: ['patient'],
    }),
    findPatientByName: builder.mutation<PatientBrief[], string>({
      query: (name: string) => ({
        url: `find?name=${name}`,
        method: 'GET',
      }),
    }),
    findPatientByName2: builder.query<PatientBrief[], string>({
      query: (name: string) => `find?name=${name}`,
    }),
    getPatientDetail: builder.query<Patient, number>({
      query: (patId) => `detail?id=${patId}`,
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
