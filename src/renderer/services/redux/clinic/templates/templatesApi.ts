import { CertificateTemplate, PrintingTemplate } from '@models/instance.model';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { createQuery } from '@stores/staticQueriesStore';

const templatesApi = createApi({
  reducerPath: 'templatesApi',
  baseQuery: createQuery('clinic/templates').query,
  tagTypes: ['print', 'certificates'],
  endpoints: (builder) => ({
    getPrintTemplate: builder.query<PrintingTemplate, void>({
      query: () => 'print',
      providesTags: ['print'],
    }),
    setPrintTemplate: builder.mutation<boolean, PrintingTemplate>({
      query: (body) => {
        return { url: 'print', body: { ...body }, method: 'POST' };
      },
      invalidatesTags: ['print'],
    }),
    getCertificateTemplates: builder.query<
      {
        id: number;
        title: string;
      }[],
      void
    >({
      query: () => 'certificates',
      providesTags: ['certificates'],
    }),
    getCertificateTemplateById: builder.query<CertificateTemplate, number>({
      query: (id) => `certificate/${id}`,
    }),
    addCertificateTemplate: builder.mutation<
      boolean,
      Omit<CertificateTemplate, 'id'>
    >({
      query: (body) => {
        return { url: 'certificate', body: { ...body }, method: 'POST' };
      },
      invalidatesTags: ['certificates'],
    }),
    updateCertificateTemplate: builder.mutation<
      boolean,
      { id: number; body: Partial<Omit<CertificateTemplate, 'id'>> }
    >({
      query: ({ id, body }) => {
        return { url: `certificate/${id}`, body: { ...body }, method: 'POST' }; //TODO change to PATCH
      },
      invalidatesTags: ['certificates'],
    }),

    deleteCertificateTemplate: builder.mutation<boolean, number>({
      query: (id) => {
        return {
          url: `certificate/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['certificates'],
    }),
  }),
});
export default templatesApi;
export const {
  useGetCertificateTemplatesQuery,
  useGetCertificateTemplateByIdQuery,
  useAddCertificateTemplateMutation,
  useGetPrintTemplateQuery,
  useDeleteCertificateTemplateMutation,
  useSetPrintTemplateMutation,
  useUpdateCertificateTemplateMutation,
} = templatesApi;
