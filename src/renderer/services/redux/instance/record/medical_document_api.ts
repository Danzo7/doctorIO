import { MedicalDocument } from '@models/instance.model';
import { StaticQueries } from '@redux/dynamic_queries';
import { createApi, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { parseISO } from 'date-fns';

const medicalDocumentApi = createApi({
  reducerPath: 'medicalDocumentApi',
  baseQuery: StaticQueries.medicalDocument.query,
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
      query: (patId) => `?patientId=${patId}`,
      providesTags: ['MedicalDocument'],
    }),
    downloadDocument: builder.mutation<any, { id: string; name: string }>({
      queryFn: async ({ id, name }, _, __, baseQuery) => {
        const result = await baseQuery({
          mode: 'cors',
          url: `/download?id=${id}`,
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
        url: `?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MedicalDocument'],
    }),
    uploadFile: builder.mutation<
      boolean,
      { patientId: number; data: FormData }
    >({
      query: ({ patientId, data }) => ({
        url: `/upload?patientId=${patientId}`,
        method: 'POST',
        body: data,
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
