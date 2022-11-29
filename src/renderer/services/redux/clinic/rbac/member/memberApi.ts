import { buildAbilityFor } from '@ability/utils';
import { Logger } from '@libs/Logger';
import { Member, MemberBrief, PermKeys } from '@models/server.models';
import { StaticQueries } from '@redux/dynamic_queries';
import appointmentApi from '@redux/instance/Appointment/AppointmentApi';
import appointmentQueueApi from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { useAbilityStore } from '@stores/abilityStore';
import { useConnectionStore } from '@stores/ConnectionStore';
import { useQueueSelectionStore } from '@stores/queueSelectionStore';
import { parseISO } from 'date-fns';
import { Socket } from 'socket.io-client';
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
      providesTags: ['members'],
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
          const { data: res } = await queryFulfilled;
          useAbilityStore
            .getState()
            .set(buildAbilityFor(res.permissions, res.lvl == 0));

          const ws = useConnectionStore.getState().socket as Socket;

          if (!ws) Logger.error('MemberApi', 'bad socket! bad socket!');
          ws.on('connections', () => {
            dispatch(memberApi.util.invalidateTags(['members']));
          });

          ws.on(
            'queue',
            ({
              tags,
              queueId,
            }: {
              tags: ('booked' | 'state' | 'queue' | 'item')[];
              queueId: number;
            }) => {
              if (
                useQueueSelectionStore.getState().getSelectedQueue().id ===
                queueId
              ) {
                if (tags[0] === 'booked') {
                  const [__, ...tag] = tags;
                  dispatch(appointmentQueueApi.util.invalidateTags(tag as any));
                  dispatch(appointmentApi.util.invalidateTags(['booked']));
                } else
                  dispatch(
                    appointmentQueueApi.util.invalidateTags(tags as any),
                  );
              }
            },
          );

          ws.on(
            'appointment',
            ({
              queueId,
              tags,
            }: {
              tags: ('payment' | 'booked' | 'item')[];
              queueId: number;
            }) => {
              if (
                useQueueSelectionStore.getState().getSelectedQueue().id ===
                queueId
              ) {
                if (tags[0] === 'item') {
                  const [__, ...tag] = tags;
                  dispatch(appointmentQueueApi.util.invalidateTags(['item']));
                  dispatch(appointmentApi.util.invalidateTags(tag as any));
                } else
                  dispatch(appointmentApi.util.invalidateTags(tags as any));
              }
            },
          );
          ws.on('role', (data: 'self' | 'setting' | 'assign') => {
            if (data == 'self') {
              dispatch(memberApi.util.invalidateTags(['me']));
              //   dispatch(roleApi.util.invalidateTags(['roles']));
              //  dispatch(appointmentQueueApi.util.invalidateTags(['queue']));
            }
            if (data == 'setting') {
              dispatch(roleApi.util.invalidateTags(['roles']));
            }
            dispatch(memberApi.util.invalidateTags(['members']));
          });
        } catch (e: any) {
          Logger.error('MemberApi', e);
        }
      },
    }),
    getMyMemberDetail: builder.query<Member, void>({
      query: () => '/me/',
      providesTags: ['me'],
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data: res } = await queryFulfilled;
          useQueueSelectionStore.getState().setQueues(res.queues ?? []);
        } catch (e: any) {
          Logger.error('MemberApi', e);
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
