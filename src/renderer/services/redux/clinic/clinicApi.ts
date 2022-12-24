import { Clinic } from '@models/server.models';
import { StaticQueries } from '@redux/dynamic_queries';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

const clinicApi = createApi({
  reducerPath: 'clinicApi',
  baseQuery: StaticQueries.clinic.query,
  tagTypes: ['clinic'],
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
    getFields: builder.query<
      { id: number; name: string; unit: string }[],
      void
    >({
      query: () => 'vital-fields',
    }),
    createField: builder.mutation<boolean, { name: string; unit: string }>({
      query: (body) => {
        return { url: 'vital-fields', body: { ...body }, method: 'POST' };
      },
    }),
    updateField: builder.mutation<
      boolean,
      { id: number; name: string; unit: string }
    >({
      query: (body) => {
        return {
          url: `vital-fields/${body.id}`,
          body: { ...body },
          method: 'PATCH',
        };
      },
    }),
  }),
});
export default clinicApi;
export const {
  useGetClinicQuery,
  useUpdateClinicOverviewMutation,
  useGetFieldsQuery,
} = clinicApi;
