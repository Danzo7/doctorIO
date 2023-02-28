import { VitalField } from '@models/local.models';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { createQuery } from '@stores/staticQueriesStore';
import { useVitalFieldsStore } from '@stores/vitalFieldsStore';

const vitalFieldsApi = createApi({
  reducerPath: 'vitalFieldsApi',
  baseQuery: createQuery('clinic/vital-fields').query,
  tagTypes: ['vitals'],
  endpoints: (builder) => ({
    getFields: builder.query<VitalField[], void>({
      query: () => '',
      onQueryStarted: (arg, { queryFulfilled }) => {
        queryFulfilled.then((data) => {
          useVitalFieldsStore.getState().syncFields(data.data);
        });
      },
      providesTags: ['vitals'],
    }),
    createField: builder.mutation<boolean, VitalField>({
      query: (body) => {
        return { url: '', body: { ...body }, method: 'POST' };
      },
      invalidatesTags: ['vitals'],
    }),
    updateField: builder.mutation<boolean, VitalField[]>({
      query: (body) => {
        return {
          url: ``,
          body: { ...body },
          method: 'PATCH',
        };
      },
      invalidatesTags: ['vitals'],
    }),
    deleteField: builder.mutation<boolean, string>({
      query: (name) => {
        return {
          url: ``,
          body: { name },
          method: 'DELETE',
        };
      },
      invalidatesTags: ['vitals'],
    }),
  }),
});
export default vitalFieldsApi;
export const {
  useGetFieldsQuery,
  useCreateFieldMutation,
  useDeleteFieldMutation,
  useUpdateFieldMutation,
} = vitalFieldsApi;
