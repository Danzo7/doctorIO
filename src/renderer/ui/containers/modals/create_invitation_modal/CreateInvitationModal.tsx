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
import { Overlay } from '@libs/overlay';
import { useCreateInvitationMutation } from '@redux/clinic/invitation/invitationApi';
import { useGetMembersQuery } from '@redux/clinic/rbac/member/memberApi';
import {
  addRole,
  clearAddedRoles,
  deleteRole,
} from '@redux/local/small_role_invSlice';
import { useAppDispatch, useAppSelector } from '@store';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import search from 'toSvg/search.svg?icon';
import './style/index.scss';

interface Inputs {
  searchField: string;
}
interface CreateInvitationModalProps {}
export default function CreateInvitationModal({}: CreateInvitationModalProps) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { isDirty },
  } = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: { searchField: '' },
  });
  const invTypes = ['Join', 'Relink'];
  const [selectedType, setselectedType] = useState(invTypes[0]);
  const { data, isLoading, error, isSuccess } = useGetMembersQuery();
  const addedRole = useAppSelector(
    (state) => state.smallRoleInvSlice.addedRole,
  );
  const dispatch = useAppDispatch();
  const [CreateInvitation] = useCreateInvitationMutation();
  const [invResult, setInvResult] = useState<any>();
  const filterMembers = (value: string) => {
    return data?.filter(({ name, id }) =>
      id != 1 && value.length > 0
        ? RegExp(`^${value.trim().replace(/\s\s+/g, ' ')}`, 'i').test(name)
        : false,
    );
  };
  const filteredMembers = filterMembers(watch('searchField'));
  const serverError: string | undefined = (error as any)?.data?.message;
  return (
    <ModalContainer
      onSubmit={handleSubmit(() => {
        const addedRoleId = addedRole.map((role) => role.id);
        if (addedRoleId.length == 0)
          throw new Error('Please add at least one role'); //Catch
        CreateInvitation({
          type: 'JOIN',
          roles: addedRoleId,
        }).then((res) => {
          dispatch(clearAddedRoles());
          setInvResult(res);
        });
      })}
      title={invResult ? 'Invitation Key' : 'Create an invitation key'}
      controls={
        <>
          {!invResult ? (
            selectedType == invTypes[1] ? (
              <div className="result-div">
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  isSuccess &&
                  data &&
                  filteredMembers?.map((member) => (
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
                            }).then((res) => setInvResult(res));
                          }}
                        />
                      }
                    />
                  ))
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
                blank
                type="submit"
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
                Overlay.close();
              }}
            />
          )}
        </>
      }
    >
      {!invResult ? (
        <div className="invitation-div">
          <MultiOptionSwitcher
            onChange={(selectedIndex) => {
              setselectedType(invTypes[selectedIndex]);
            }}
            textList={invTypes}
            defaultSelected={0}
            backgroundColor={color.darkersec_color}
          />
          {selectedType == invTypes[1] ? (
            <Input
              fillContainer
              placeholder="Select a member..."
              trailing={<TextButton Icon={search} />}
              type="search"
              name="searchField"
              control={control}
              errorMessage={
                isDirty && filteredMembers?.length == 0
                  ? 'No member founds'
                  : serverError
              }
            />
          ) : (
            <div className="role-list-div">
              <SmallRoleList
                roleList={addedRole}
                onAdd={(role) => {
                  dispatch(addRole(role));
                }}
                onDelete={(role) => {
                  dispatch(deleteRole(role));
                }}
              />
            </div>
          )}
        </div>
      ) : invResult?.data ? (
        <CopyField
          text={(invResult as any).data.key}
          hint="The invitation key is valid for 1 minute"
        />
      ) : (
        <span>
          {' '}
          {invResult?.error?.data?.message ?? 'Something went wrong'}{' '}
        </span>
      )}
    </ModalContainer>
  );
}
