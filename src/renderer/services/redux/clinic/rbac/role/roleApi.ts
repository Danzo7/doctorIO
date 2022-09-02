/* eslint-disable @typescript-eslint/naming-convention */
import { PermKeys, Role, RoleBrief } from '@models/server.models';
import { StaticQueries } from '@redux/dynamic_queries';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

const roleApi = createApi({
  reducerPath: 'roleApi',
  baseQuery: StaticQueries.roles.query,
  tagTypes: ['roles'],
  endpoints: (builder) => ({
    //TODO change types to the correct ones
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
    }),
    getRoleById: builder.query<Role, number>({
      query: (roleId) => `/${roleId}`,
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

    UpdateRole: builder.mutation<void, number>({
      query: (body) => {
        return { url: `?id=${body}`, method: 'PATCH' };
      },
      invalidatesTags: ['roles'],
    }),
  }),
});
export default roleApi;
export const {
  useCreateNewRoleMutation,
  useGetBriefRolesQuery,
  useGetRolesQuery,
  useUpdateRoleMutation,
  useGetRoleByIdQuery,
} = roleApi;
