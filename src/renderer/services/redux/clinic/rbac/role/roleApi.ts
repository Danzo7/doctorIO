/* eslint-disable @typescript-eslint/naming-convention */
import { PermKeys, Role, RoleBrief } from '@models/server.models';
import { StaticQueries } from '@redux/dynamic_queries';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import memberApi from '../member/memberApi';

const roleApi = createApi({
  reducerPath: 'roleApi',
  baseQuery: StaticQueries.roles.query,
  tagTypes: ['roles'],
  endpoints: (builder) => ({
    getBriefRoles: builder.query<RoleBrief[], void>({
      query: () => '',
      providesTags: ['roles'],
    }),
    getRoles: builder.query<
      {
        id: number;
        name: string;
        priority: number;
        description?: string;
        permissions?: PermKeys[];
        masterRole?: RoleBrief;
        slaveRole?: RoleBrief;
      }[],
      void
    >({
      query: () => '/roles',
      providesTags: ['roles'],
    }),
    getRoleById: builder.query<Role, number>({
      query: (roleId) => `/${roleId}`,
      keepUnusedDataFor: 0,
    }),
    createNewRole: builder.mutation<
      any,
      {
        name: string;
        description: string;
        permissions: number[];
        masterRoleId?: number;
      }
    >({
      query: (body) => {
        return { url: '/create', method: 'POST', body: { ...body } };
      },
      invalidatesTags: ['roles'],
    }),

    UpdateRole: builder.mutation<
      void,
      {
        id: number;
        body: {
          name?: string;
          description?: string;
          permissions: number[];
        };
      }
    >({
      query: ({ id, body }) => {
        return { url: ``, method: 'PATCH', body: { ...body }, params: { id } };
      },
      invalidatesTags: ['roles'],
    }),
    assignRole: builder.mutation<true, { memberId: number; roleId: number }>({
      query: (body) => {
        return { url: '/assign', method: 'PATCH', body: { ...body } };
      },
      invalidatesTags: ['roles'],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(memberApi.util.invalidateTags(['members']));
        } catch (err) {
          //console.log(err);
        }
      },
    }),
    revokeRole: builder.mutation<true, { memberId: number; roleId: number }>({
      query: (body) => {
        return { url: '/revoke', method: 'PATCH', body: { ...body } };
      },
      invalidatesTags: ['roles'],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(memberApi.util.invalidateTags(['members']));
        } catch (err) {
          //console.log(err);
        }
      },
    }),
    deleteRole: builder.mutation<true, number>({
      query: (roleId) => {
        return { url: `/${roleId}`, method: 'DELETE' };
      },
      invalidatesTags: ['roles'],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(memberApi.util.invalidateTags(['members']));
        } catch (err) {
          //console.log(err);
        }
      },
    }),
  }),
});
export default roleApi;
export const {
  useCreateNewRoleMutation,
  useGetBriefRolesQuery,
  useUpdateRoleMutation,
  useGetRoleByIdQuery,
  useLazyGetRoleByIdQuery,
  useAssignRoleMutation,
  useRevokeRoleMutation,
  useDeleteRoleMutation,
} = roleApi;
