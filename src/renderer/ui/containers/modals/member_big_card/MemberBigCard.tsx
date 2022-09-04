import { color } from '@assets/styles/color';
import TextPair from '@components/text_pair/TextPair';
import UserProfileStatus from '@components/user_profile_status';
import './style/index.scss';
import SmallRoleList from '@components/members_preview/small_role_list';
import MemberActionControls from '@components/member_action_controls';
import { MemberBrief } from '@models/server.models';
import { format } from 'date-fns';
import { DATE_ONLY } from '@constants/data_format';
import { useGetMemberDetailQuery } from '@redux/clinic/rbac/member/memberApi';
import LoadingSpinner from '@components/loading_spinner';
import {
  useAssignRoleMutation,
  useRevokeRoleMutation,
} from '@redux/clinic/rbac/role/roleApi';

export default function MemberBigCard({ id }: Pick<MemberBrief, 'id'>) {
  const { data, isSuccess, isLoading, error } = useGetMemberDetailQuery(id);
  const [AssignRole, AssignResult] = useAssignRoleMutation();
  const [RevokeRole, RevokeResult] = useRevokeRoleMutation();

  return isLoading ? (
    <LoadingSpinner />
  ) : isSuccess ? (
    <div className="member-big-card">
      <UserProfileStatus
        imgSrc={data.avatar}
        status={data.status}
        width={100}
        alt={data.name + id}
      />
      <div className="fullName-id-container">
        <span>{data.name}</span>
        <span>#{data.id}</span>
      </div>
      <TextPair
        first={{ text: 'Age', fontSize: 15, fontColor: color.text_gray }}
        second={{
          text: data.age.toString(),
          fontSize: 17,
          fontColor: color.white,
        }}
        alignItems={'center'}
      />
      <TextPair
        first={{ text: 'Gender', fontSize: 15, fontColor: color.text_gray }}
        second={{
          text: data.gender,
          fontSize: 17,
          fontColor: color.white,
        }}
        alignItems={'center'}
      />
      {data.phone && (
        <TextPair
          first={{
            text: 'Phone number',
            fontSize: 15,
            fontColor: color.text_gray,
          }}
          second={{
            text: data.phone,
            fontSize: 17,
            fontColor: color.white,
          }}
          alignItems={'center'}
        />
      )}
      {data.address && (
        <TextPair
          first={{ text: 'Address', fontSize: 15, fontColor: color.text_gray }}
          second={{
            text: data.address,
            fontSize: 17,
            fontColor: color.white,
          }}
          alignItems={'center'}
        />
      )}
      <TextPair
        first={{ text: 'Join date', fontSize: 15, fontColor: color.text_gray }}
        second={{
          text: format(data.joinDate, DATE_ONLY),
          fontSize: 17,
          fontColor: color.white,
        }}
        alignItems={'center'}
      />
      {data.addedBy && (
        <TextPair
          first={{ text: 'Added by', fontSize: 15, fontColor: color.text_gray }}
          second={{
            text: data.addedBy?.name,
            fontSize: 17,
            fontColor: color.white,
          }}
          alignItems={'center'}
        />
      )}
      <div className="role-container">
        <span>Role</span>
        <SmallRoleList
          roleList={data.roles}
          onAdd={(role) => {
            //FIXME fetch error
            AssignRole({ memberId: id, roleId: role.id });
          }}
          onDelete={(role) => {
            RevokeRole({ memberId: id, roleId: role.id });
          }}
        />
      </div>
      <MemberActionControls showCard={false} id={id} />
    </div>
  ) : (
    <span>error when loading member detail</span>
  );
}
