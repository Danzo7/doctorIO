/* eslint-disable @typescript-eslint/naming-convention */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const memberApi = createApi({
  reducerPath: 'memberApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/clinic/member' }),
  endpoints: (builder) => ({
    getMembers: builder.query<
      {
        id: number;
        name: string;
        status: boolean;
        roles: { id: number; name: string; priority: number }[];
      },
      void
    >({
      query: () => '',
    }),
  }),
});
export default memberApi;
export const { useGetMembersQuery } = memberApi;
