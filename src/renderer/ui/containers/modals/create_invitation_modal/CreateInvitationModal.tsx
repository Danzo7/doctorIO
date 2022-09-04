import color from '@assets/styles/color';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import MultiOptionSwitcher from '@components/buttons/multi_option_switcher';
import TextButton from '@components/buttons/text_button';
import CopyField from '@components/copy_field';
import Input from '@components/inputs/input';
import LoadingSpinner from '@components/loading_spinner';
import SmallRoleList from '@components/members_preview/small_role_list';
import MemberMiniCard from '@components/member_mini_card';
import ModalContainer from '@components/modal_container';
import { zodResolver } from '@hookform/resolvers/zod';
import { Overlay } from '@libs/overlay';
import { ServerError } from '@models/instance.model';
import { useCreateInvitationMutation } from '@redux/clinic/invitation/invitationApi';
import { useLazyGetMemberByIdQuery } from '@redux/clinic/rbac/member/memberApi';
import { useGetBriefRolesQuery } from '@redux/clinic/rbac/role/roleApi';
import { addRole, deleteRole } from '@redux/local/small_role_invSlice';
import { useAppDispatch, useAppSelector } from '@store';
import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import search from 'toSvg/search.svg?icon';
import { z } from 'zod';
import './style/index.scss';

interface Inputs {
  searchField: string;
}
const schema = z.object({
  searchField: z.number({ required_error: 'write the member id' }).min(1),
});
interface CreateInvitationModalProps {}
export default function CreateInvitationModal({}: CreateInvitationModalProps) {
  const { control, handleSubmit, reset, getValues } = useForm<Inputs>({
    mode: 'onSubmit',
    defaultValues: { searchField: '' },
  });
  const invTypes = ['Join', 'Relink'];
  const [selectedType, setselectedType] = useState(invTypes[0]);

  const searchRef = useRef<string>('');
  const [GetMemberById, result] = useLazyGetMemberByIdQuery();

  const addedRole = useAppSelector(
    (state) => state.smallRoleInvSlice.addedRole,
  );
  const dispatch = useAppDispatch();
  const [CreateInvitation] = useCreateInvitationMutation();

  const [invKey, setInvKey] = useState<any>();
  return (
    <ModalContainer
      onSubmit={handleSubmit((value) => {
        if (selectedType == invTypes[1]) {
          if (searchRef.current != value.searchField) {
            searchRef.current = value.searchField;
            const memId = Number(searchRef.current);
            if (!isNaN(memId)) GetMemberById(memId, false);
          }
        } else {
          const addedRoleId = addedRole.map((role) => role.id);
          console.log('addedRoleId JOIN :', addedRoleId);
          CreateInvitation({
            type: 'JOIN',
            roles: addedRoleId,
          }).then((res) => setInvKey(res));
        }
      })}
      title={invKey ? 'Invitation Key' : 'Create an invitation key'}
      controls={
        <>
          {!invKey ? (
            selectedType == invTypes[1] ? (
              <div className="result-div">
                {result.isLoading ? (
                  <LoadingSpinner />
                ) : (
                  result.isSuccess && (
                    <MemberMiniCard
                      fullName={result.data.name}
                      memberId={result.data.id}
                      status={result.data.status}
                      avatar={result.data.avatar}
                      buttonNode={
                        <DarkLightCornerButton
                          text="Select"
                          onPress={() => {
                            const addedRoleId = result.data.roles.map(
                              (role) => role.id,
                            );
                            console.log('addedRoleId :', addedRoleId);
                            CreateInvitation({
                              type: 'RELINK',
                              roles: addedRoleId,
                            }).then((res) => setInvKey(res));
                          }}
                        />
                      }
                    />
                  )
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
      {!invKey ? (
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
              trailing={<TextButton Icon={search} blank type="submit" />}
              type="search"
              name="searchField"
              control={control}
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
      ) : invKey?.data ? (
        <CopyField text={(invKey as any).data.key} />
      ) : (
        <span> something went wrong </span>
      )}
    </ModalContainer>
  );
}
