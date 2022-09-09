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
    }),
  }),
});
export default clinicApi;
export const { useGetClinicQuery, useUpdateClinicOverviewMutation } = clinicApi;
