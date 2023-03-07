import { MedicalDocument } from '@models/instance.model';
import { createApi } from '@reduxjs/toolkit/query/react';
import { createQuery } from '@stores/staticQueriesStore';
import { parseISO } from 'date-fns';

const medicalDocumentApi = createApi({
  reducerPath: 'medicalDocumentApi',
  baseQuery: createQuery('record/document').query,
  tagTypes: ['MedicalDocument'],
  endpoints: (builder) => ({
    getMedicalDocuments: builder.query<MedicalDocument[], number>({
      transformResponse: (
        response: (Omit<MedicalDocument, 'date'> & { date: string })[],
      ) => {
        return response.map(({ date, ...item }) => {
          return {
            ...item,
            date: parseISO(date),
          };
        });
      },
      query: (patientId) => {
        return {
          url: ``,
          params: { patientId },
        };
      },

      providesTags: ['MedicalDocument'],
    }),
    downloadDocument: builder.mutation<Blob, { id: string; name: string }>({
      queryFn: async ({ id }, _, __, baseQuery) => {
        const result = await baseQuery({
          mode: 'cors',
          url: `/download`,
          params: { id },
          responseHandler: async (response) => {
            if (response.ok) {
              const blob = await response.blob();

              return blob;
            } else {
              const error = await response.json();
              return error;
            }
          },
        });
        if ('data' in result) return result as any;
        else return result as any;
      },
    }),
    //POST
    deleteDocument: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: ``,
        method: 'DELETE',
        params: { id },
      }),
      invalidatesTags: ['MedicalDocument'],
    }),
    uploadFile: builder.mutation<
      boolean,
      { patientId: number; data: FormData }
    >({
      query: ({ patientId, data }) => ({
        url: `/upload`,
        method: 'POST',
        body: data,
        params: { patientId },
      }),
      invalidatesTags: ['MedicalDocument'],
    }),
  }),
});
export default medicalDocumentApi;
export const {
  useGetMedicalDocumentsQuery,
  useUploadFileMutation,
  useDownloadDocumentMutation,
  useDeleteDocumentMutation,
} = medicalDocumentApi;
