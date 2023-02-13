import { CertificateTemplate, PrintingTemplate } from '@models/instance.model';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { createQuery } from '@stores/staticQueriesStore';
import { Descendant } from 'slate';

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
      query: ({ template, ...others }) => {
        return {
          url: 'print',
          body: { ...others, template: JSON.stringify(template) },
          method: 'PATCH',
        };
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
    getCertificateTemplateById: builder.query<
      { id: number; title: string; template: Descendant[] },
      number
    >({
      query: (id) => `certificate/${id}`,
      providesTags: ['certificates'],
    }),
    addCertificateTemplate: builder.mutation<
      boolean,
      Omit<CertificateTemplate, 'id'>
    >({
      query: ({ title, template }) => {
        return {
          url: 'certificate',
          body: {
            title: title,
            template: JSON.stringify(template),
          },
          method: 'POST',
        };
      },
      invalidatesTags: ['certificates'],
    }),
    updateCertificateTemplate: builder.mutation<
      boolean,
      { id: number; body: Partial<Omit<CertificateTemplate, 'id'>> }
    >({
      query: ({ id, body: { template, title } }) => {
        return {
          url: `certificate/${id}`,
          body: {
            title: title,
            template: template ? JSON.stringify(template) : undefined,
          },
          method: 'PATCH',
        };
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
