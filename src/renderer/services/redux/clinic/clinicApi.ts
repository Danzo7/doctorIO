import { VitalField } from '@models/local.models';
import { Clinic } from '@models/server.models';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { createQuery } from '@stores/staticQueriesStore';
import { useVitalFieldsStore } from '@stores/vitalFieldsStore';

const clinicApi = createApi({
  reducerPath: 'clinicApi',
  baseQuery: createQuery('clinic').query,
  tagTypes: ['clinic', 'vitals'],
  endpoints: (builder) => ({
    getClinic: builder.query<Clinic, void>({
      query: () => '',
      providesTags: ['clinic'],
    }),
    updateClinicOverview: builder.mutation<
      boolean,
      { name: string; description: string; phone?: string; address: string }
    >({
      query: (body) => {
        return { url: '', body: { ...body }, method: 'PATCH' };
      },
      invalidatesTags: ['clinic'],
      // onQueryStarted: (arg, { dispatch, queryFulfilled }) => {
      // const {data}=await queryFulfilled;
      // useClinicsStore.getState().//TODO: Set selected clinic info from data
    }),
    getFields: builder.query<VitalField[], void>({
      query: () => 'vital-fields',
      onQueryStarted: (arg, { queryFulfilled }) => {
        queryFulfilled.then((data) => {
          useVitalFieldsStore.getState().syncFields(data.data);
        });
      },
      providesTags: ['vitals'],
    }),
    createField: builder.mutation<boolean, VitalField>({
      query: (body) => {
        return { url: 'vital-fields', body: { ...body }, method: 'POST' };
      },
      invalidatesTags: ['vitals'],
    }),
    updateField: builder.mutation<boolean, VitalField[]>({
      query: (body) => {
        return {
          url: `vital-fields`,
          body: { ...body },
          method: 'PATCH',
        };
      },
      invalidatesTags: ['vitals'],
    }),
    deleteField: builder.mutation<boolean, string>({
      query: (name) => {
        return {
          url: `vital-fields`,
          body: { name },
          method: 'DELETE',
        };
      },
      invalidatesTags: ['vitals'],
    }),
  }),
});
export default clinicApi;
export const {
  useGetClinicQuery,
  useUpdateClinicOverviewMutation,
  useGetFieldsQuery,
  useCreateFieldMutation,
  useDeleteFieldMutation,
  useUpdateFieldMutation,
} = clinicApi;
