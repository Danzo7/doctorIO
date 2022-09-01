/* eslint-disable @typescript-eslint/naming-convention */
import { PermKeys, RoleBrief } from '@models/server.models';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const roleApi = createApi({
  reducerPath: 'roleApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/clinic/role' }),
  tagTypes: ['role'],
  endpoints: (builder) => ({
    //TODO change types to the correct ones
    getBriefRoles: builder.query<RoleBrief, void>({
      query: () => '',
      providesTags: ['role'],
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
      },
      void
    >({
      query: () => '/roles',
      providesTags: ['role'],
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
      invalidatesTags: ['role'],
    }),
    //FIXME make the url dynamic to insert id
    UpdateRole: builder.mutation<void, number[]>({
      query: (body) => {
        return { url: '', method: 'PATCH', body: { ...body } };
      },
      invalidatesTags: ['role'],
    }),
  }),
});
export default roleApi;
export const {
  useCreateNewRoleMutation,
  useGetBriefRolesQuery,
  useGetRolesQuery,
  useUpdateRoleMutation,
} = roleApi;
