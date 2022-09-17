/* eslint-disable @typescript-eslint/naming-convention */
import { Member, MemberBrief, PermKeys } from '@models/server.models';
import { StaticQueries } from '@redux/dynamic_queries';
import appointmentApi from '@redux/instance/Appointment/AppointmentApi';
import appointmentQueueApi from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import { unreachable } from '@redux/local/connectionStateSlice';
import { store } from '@redux/store';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { parseISO } from 'date-fns';
import { io } from 'socket.io-client';

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
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        try {
          await queryFulfilled;
        } catch (e) {
          dispatch(unreachable());
        }
      },
    }),
    getMyMemberDetail: builder.query<Member, void>({
      query: () => '/me/',
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        try {
          await queryFulfilled;
          const user = store.getState().user;
          if (user.selectedClinic == undefined)
            throw new Error('No clinic selected');
          const url = user.clinic[user.selectedClinic].serverLocation;
          const ws = io(`ws://${url}/ws`, {
            auth: {
              token: store.getState().authSlice.accessToken,
            },
          });
          ws.on('connections', () => {
            dispatch(memberApi.util.invalidateTags(['members']));
          });

          ws.on('queue', (tags: ('booked' | 'state' | 'queue' | 'item')[]) => {
            if (tags[0] === 'booked') {
              const [__, ...tag] = tags;
              dispatch(appointmentQueueApi.util.invalidateTags(tag as any));
              dispatch(appointmentApi.util.invalidateTags(['booked']));
            } else
              dispatch(appointmentQueueApi.util.invalidateTags(tags as any));
          });

          ws.on('appointment', (tags: ('payment' | 'booked' | 'item')[]) => {
            if (tags[0] === 'item') {
              const [__, ...tag] = tags;
              dispatch(appointmentQueueApi.util.invalidateTags(['item']));
              dispatch(appointmentApi.util.invalidateTags(tag as any));
            } else dispatch(appointmentApi.util.invalidateTags(tags as any));
          });
        } catch (e) {
          dispatch(unreachable());
        }
      },
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
