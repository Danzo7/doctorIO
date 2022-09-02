/* eslint-disable @typescript-eslint/naming-convention */
import { MemberBrief, RoleBrief } from '@models/server.models';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const memberApi = createApi({
  reducerPath: 'memberApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/clinic/member' }),
  tagTypes: ['members'],
  endpoints: (builder) => ({
    getMembers: builder.query<MemberBrief, void>({
      query: () => '',
      providesTags: ['members'],
    }),
  }),
});
export default memberApi;
export const { useGetMembersQuery } = memberApi;
