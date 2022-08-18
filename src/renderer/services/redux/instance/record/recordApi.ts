import {
  MedicalDocument,
  MedicalHistory,
  Patient,
  PatientBrief,
} from '@models/instance.model';
import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { parseISO } from 'date-fns';

export const api = createApi({
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
      Patient,
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
        body: { ...body },
      }),
      invalidatesTags: ['MedicalHistory'],
    }),
    //documentService
    //GET
    getMedicalDocuments: builder.query<MedicalDocument[], number>({
      transformResponse: (
        response: (Omit<MedicalDocument, 'date'> & { date: string })[],
      ) => {
        return response.map((item) => {
          return {
            ...item,
            date: parseISO(item.date),
          };
        });
      },
      query: (patId) => `/document?patientId=${patId}`,
      providesTags: ['MedicalDocument'],
    }),
    downloadDocument: builder.mutation<any, { id: string; name: string }>({
      queryFn: async ({ id, name }, _, __, baseQuery) => {
        const result = await baseQuery({
          mode: 'cors',
          url: `/document/download?id=${id}`,
          responseHandler: async (response) => {
            if (response.ok) {
              const blob = await response.blob();
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = name;
              a.click();
              a.remove();
              window.URL.revokeObjectURL(url);
              return null;
            } else {
              const error = await response.json();
              return error;
            }
          },
        });
        if (result === null) return { data: null };
        else return { error: result as FetchBaseQueryError };
      },
    }),
    //POST
    deleteDocument: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/document?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MedicalDocument'],
    }),
    uploadFile: builder.mutation<
      boolean,
      { patientId: number; data: FormData }
    >({
      query: ({ patientId, data }) => ({
        url: `/document/upload?patientId=${patientId}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['MedicalDocument'],
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
  useGetMedicalDocumentsQuery,
  useUploadFileMutation,
  useDownloadDocumentMutation,
  useDeleteDocumentMutation,
} = api;
