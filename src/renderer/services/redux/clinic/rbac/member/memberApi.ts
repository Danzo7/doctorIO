/* eslint-disable @typescript-eslint/naming-convention */
import { Member, MemberBrief, PermKeys } from '@models/server.models';
import { StaticQueries } from '@redux/dynamic_queries';
import appointmentApi from '@redux/instance/Appointment/AppointmentApi';
import appointmentQueueApi from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import { unreachable, connecting } from '@redux/local/connectionStateSlice';
import { store } from '@redux/store';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { useSocketStore } from '@stores/socketStore';
import { parseISO } from 'date-fns';
import { io } from 'socket.io-client';
import roleApi from '../role/roleApi';

const memberApi = createApi({
  reducerPath: 'memberApi',
  baseQuery: StaticQueries.members.query,
  tagTypes: ['members', 'me'],
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
      providesTags: ['me'],
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        try {
          await queryFulfilled;
          let ws = useSocketStore.getState().socket;

          if (!ws) {
            const user = store.getState().user;
            if (user.selectedClinic == undefined)
              throw new Error('No clinic selected');
            const url = user.clinic[user.selectedClinic].serverLocation;
            ws = io(`ws://${url}/ws`, {
              auth: {
                token: store.getState().authSlice.accessToken,
              },
            });
            useSocketStore.setState({ socket: ws });

            ws.on('connections', () => {
              dispatch(memberApi.util.invalidateTags(['members']));
            });
            ws.on('connect', () => {
              dispatch(connecting());
            });

            ws.on(
              'queue',
              (tags: ('booked' | 'state' | 'queue' | 'item')[]) => {
                if (tags[0] === 'booked') {
                  const [__, ...tag] = tags;
                  dispatch(appointmentQueueApi.util.invalidateTags(tag as any));
                  dispatch(appointmentApi.util.invalidateTags(['booked']));
                } else
                  dispatch(
                    appointmentQueueApi.util.invalidateTags(tags as any),
                  );
              },
            );

            ws.on('appointment', (tags: ('payment' | 'booked' | 'item')[]) => {
              if (tags[0] === 'item') {
                const [__, ...tag] = tags;
                dispatch(appointmentQueueApi.util.invalidateTags(['item']));
                dispatch(appointmentApi.util.invalidateTags(tag as any));
              } else dispatch(appointmentApi.util.invalidateTags(tags as any));
            });
            ws.on('role', (data: 'self' | 'setting' | 'assign') => {
              if (data == 'self') {
                dispatch(memberApi.util.invalidateTags(['me']));
                dispatch(roleApi.util.invalidateTags(['roles']));
                dispatch(appointmentQueueApi.util.invalidateTags(['queue']));
              }
              if (data == 'setting') {
                dispatch(roleApi.util.invalidateTags(['roles']));
              }
              dispatch(memberApi.util.invalidateTags(['members']));
            });
          }
          ws.on('disconnect', () => {
            dispatch(unreachable());
          });
        } catch (e) {
          dispatch(unreachable());
        }
      },
    }),
    getMyMemberDetail: builder.query<Member, void>({
      query: () => '/me/',
      providesTags: ['me'],
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
