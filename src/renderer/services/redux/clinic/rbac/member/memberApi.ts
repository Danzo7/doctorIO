/* eslint-disable @typescript-eslint/naming-convention */
import { Member, MemberBrief, PermKeys } from '@models/server.models';
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

    getMemberById: builder.query<MemberBrief, number>({
      query: (roleId) => `/${roleId}`,
    }),
    getMemberDetail: builder.query<Member, number>({
      query: (roleId) => `/detail?id=${roleId}`,
    }),
    getMyMemberDetail: builder.query<
      { permissions: PermKeys[]; lvl: number },
      void
    >({ query: () => '/me/permissions' }),
    getMyPermission: builder.query<Member, void>({ query: () => '/me/' }),
  }),
});
export default memberApi;
export const {
  useGetMembersQuery,
  useGetMyPermissionQuery,
  useGetMemberByIdQuery,
  useGetMemberDetailQuery,
  useGetMyMemberDetailQuery,
} = memberApi;
