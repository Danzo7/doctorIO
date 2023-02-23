import { color } from '@assets/styles/color';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import MultiOptionSwitcher from '@components/buttons/multi_option_switcher';
import TextButton from '@components/buttons/text_button';
import CopyField from '@components/copy_field';
import Input from '@components/inputs/input';
import LoadingSpinner from '@components/loading_spinner';
import SmallRoleList from '@components/members_preview/small_role_list';
import MemberMiniCard from '@components/member_mini_card';
import ModalContainer from '@components/modal_container';
import { findByName } from '@helpers/search.helper';
import { RoleBrief } from '@models/server.models';
import { useCreateInvitationMutation } from '@redux/clinic/invitation/invitationApi';
import { useGetMembersQuery } from '@redux/clinic/rbac/member/memberApi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import search from 'toSvg/search.svg?icon';
import './style/index.scss';
import { Overlay_u } from '@stores/overlayStore';

interface Inputs {
  searchField: string;
}
interface CreateInvitationModalProps {
  defaultValues?: RoleBrief[];
}
export default function CreateInvitationModal({
  defaultValues = [],
}: CreateInvitationModalProps) {
  const {
    control,
    watch,
    formState: { isDirty },
  } = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: { searchField: '' },
  });
  const [invitationType, setInvitationType] = useState<'JOIN' | 'RELINK'>(
    'JOIN',
  );
  const { data, isLoading, error, isSuccess } = useGetMembersQuery();
  const [CreateInvitation, invResult] = useCreateInvitationMutation();
  const [roles, setRoles] = useState<RoleBrief[]>(defaultValues);

  return (
    <ModalContainer
      title={
        invResult.isSuccess ? 'Invitation Key' : 'Create an invitation key'
      }
      controls={
        <>
          {invResult.isUninitialized ? (
            invitationType == 'RELINK' ? (
              <div className="result-div">
                {isLoading ? (
                  <LoadingSpinner />
                ) : isSuccess ? (
                  findByName(watch('searchField'), data, 'name', 4)?.map(
                    (member) => (
                      <MemberMiniCard
                        fullName={member.name}
                        memberId={member.id}
                        status={member.status}
                        avatar={member.avatar}
                        key={member.id + 'member'}
                        buttonNode={
                          <DarkLightCornerButton
                            text="Select"
                            onPress={() => {
                              CreateInvitation({
                                type: 'RELINK',
                                relinkToId: member.id,
                              });
                            }}
                          />
                        }
                      />
                    ),
                  ) ??
                  (isDirty && <span className="error">No member found</span>)
                ) : (
                  <span className="error">
                    {(error as any)?.data?.message ?? 'something bad happened'}
                  </span>
                )}
              </div>
            ) : (
              <TextButton
                text="Invite"
                backgroundColor={color.good_green}
                fontSize={13}
                fontWeight={700}
                alignSelf="center"
                padding={5}
                onPress={() => {
                  CreateInvitation({
                    type: 'JOIN',
                    roles: roles.map((role) => role.id),
                  });
                }}
              />
            )
          ) : (
            <TextButton
              text="Close"
              backgroundColor={color.good_green}
              fontSize={13}
              fontWeight={700}
              alignSelf="center"
              padding={5}
              onPress={() => {
                Overlay_u.close();
              }}
            />
          )}
        </>
      }
    >
      {invResult.isUninitialized ? (
        <div className="invitation-div">
          <MultiOptionSwitcher
            onChange={(selectedIndex) => {
              setInvitationType(selectedIndex == 0 ? 'JOIN' : 'RELINK');
            }}
            textList={['Join', 'Relink']}
            defaultSelected={0}
            backgroundColor={color.darkersec_color}
          />
          {invitationType == 'RELINK' ? (
            <Input
              fillContainer
              placeholder="Select a member..."
              trailing={<TextButton Icon={search} />}
              type="search"
              name="searchField"
              control={control}
              errorMessage={(error as any)?.data?.message}
            />
          ) : (
            <div className="role-list-div">
              <SmallRoleList
                roleList={roles}
                onAdd={(role) => {
                  setRoles([...roles, role]);
                }}
                onDelete={(role) => {
                  setRoles(roles.filter((r) => r.id != role.id));
                }}
              />
            </div>
          )}
        </div>
      ) : invResult.isLoading ? (
        <LoadingSpinner />
      ) : invResult.isSuccess ? (
        <CopyField
          text={invResult.data.key}
          hint="The invitation key is valid for 1 minute"
        />
      ) : (
        invResult.isError && (
          <span>
            {(invResult.error as any)?.data.message ?? 'Something went wrong'}
          </span>
        )
      )}
    </ModalContainer>
  );
}
