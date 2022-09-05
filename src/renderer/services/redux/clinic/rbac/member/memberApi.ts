/* eslint-disable @typescript-eslint/naming-convention */
import { Member, MemberBrief, PermKeys } from '@models/server.models';
import { StaticQueries } from '@redux/dynamic_queries';
import { unreachable } from '@redux/local/connectionStateSlice';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { parseISO } from 'date-fns';

const memberApi = createApi({
  reducerPath: 'memberApi',
  baseQuery: StaticQueries.members.query,
  tagTypes: ['members'],
  endpoints: (builder) => ({
    getMembers: builder.query<MemberBrief[], void>({
      query: () => '',
      providesTags: ['members'],
      transformResponse: (
        response: (Omit<MemberBrief, 'joinDate'> & { joinDate: string })[],
      ) => {
        return response.map(({ joinDate, ...other }) => ({
          ...other,
          joinDate: parseISO(joinDate),
        }));
      },
    }),

    getMemberById: builder.query<MemberBrief, number>({
      query: (id) => `/${id}`,
    }),
    getMemberDetail: builder.query<Member, number>({
      query: (id) => `/detail?id=${id}`,
      transformResponse: (
        response: Omit<Member, 'joinDate'> & { joinDate: string },
      ) => {
        return { ...response, joinDate: parseISO(response.joinDate) };
      },
    }),
    getMyPermission: builder.query<
      { permissions: PermKeys[]; lvl: number },
      void
    >({
      query: () => '/me/permissions',
      onQueryStarted: async (state, { queryFulfilled, dispatch }) => {
        try {
          await queryFulfilled;
        } catch (e) {
          dispatch(unreachable());
        }
      },
    }),
    getMyMemberDetail: builder.query<Member, void>({
      query: () => '/me/',
    }),
  }),
});
export default memberApi;
export const {
  useGetMembersQuery,
  useGetMyPermissionQuery,
  useGetMemberByIdQuery,
  useGetMemberDetailQuery,
  useGetMyMemberDetailQuery,
  useLazyGetMemberByIdQuery,
} = memberApi;
