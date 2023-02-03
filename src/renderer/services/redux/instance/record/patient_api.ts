import { BloodType, Patient, PatientBrief } from '@models/instance.model';
import { createApi } from '@reduxjs/toolkit/query/react';
import { createQuery } from '@stores/staticQueriesStore';
import { parseISO } from 'date-fns';

const patientApi = createApi({
  reducerPath: 'patientApi',
  baseQuery: createQuery('record/patient').query,
  tagTypes: ['patient', 'MedicalHistory', 'MedicalDocument'],
  endpoints: (builder) => ({
    //Patient
    //GET
    getPatient: builder.query<PatientBrief, number>({
      query: (id) => {
        return {
          url: '',
          params: { id },
        };
      },
    }),
    getPatients: builder.query<PatientBrief, void>({
      query: () => ``,
      providesTags: ['patient'],
    }),
    findPatientByName: builder.mutation<PatientBrief[], string>({
      query: (name: string) => ({
        url: `find`,
        method: 'GET',
        params: { name },
      }),
    }),
    findPatientByName2: builder.query<PatientBrief[], string>({
      query: (name: string) => ({
        url: `find`,
        params: { name },
      }),
    }),
    getPatientDetail: builder.query<Patient, number>({
      query: (id) => ({
        url: `detail`,
        params: { id },
      }),
      providesTags: ['patient'],
      transformResponse: (
        response: Omit<
          Patient,
          'birthDate' | 'registerDate' | 'nextAppointment'
        > & {
          birthDate: string;
          registerDate: string;
          nextAppointment?: string;
        },
      ) => {
        return {
          ...response,
          fullName: `${response.firstName} ${response.lastName}`,
          birthDate: parseISO(response.birthDate),
          registerDate: parseISO(response.registerDate),
          nextAppointment: response.nextAppointment
            ? parseISO(response.nextAppointment)
            : undefined,
        };
      },
    }),
    //POST
    addPatient: builder.mutation<
      PatientBrief,
      {
        firstName: string;
        lastName: string;
        birthDate: Date;
        sex: 'male' | 'female';
        bloodType?: BloodType;
      }
    >({
      query: (body) => ({ url: ``, method: 'POST', body: body }),
      invalidatesTags: ['patient'],
    }),
    updatePatientDetail: builder.mutation<
      true,
      {
        id: number;
        body: {
          firstName?: string;
          lastName?: string;
          birthDate?: Date;
          sex?: 'male' | 'female';
          bloodType?: BloodType;
        };
      }
    >({
      query: ({ id, body }) => ({
        url: '',
        body: body,
        method: 'PATCH',
        params: { id },
      }),
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
  useUpdatePatientDetailMutation,
} = patientApi;
