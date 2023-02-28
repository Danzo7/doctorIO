import { Clinic } from '@models/server.models';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { useClinicsStore } from '@stores/clinicsStore';
import { createQuery } from '@stores/staticQueriesStore';

const clinicApi = createApi({
  reducerPath: 'clinicApi',
  baseQuery: createQuery('clinic').query,
  tagTypes: ['clinic'],
  endpoints: (builder) => ({
    getClinic: builder.query<Clinic, void>({
      query: () => '',
      providesTags: ['clinic'],
      onQueryStarted: (arg, { queryFulfilled }) => {
        queryFulfilled.then((data) => {
          useClinicsStore.getState().syncCurrentClinic(data.data);
        });
      },
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
