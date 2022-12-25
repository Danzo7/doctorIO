import { AppUser } from '@models/local.models';
import { Member } from '@models/server.models';
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState extends AppUser {
  setUser(props: Partial<AppUser>): void;
  syncMemberToUser: (member: Member) => Partial<Member> | undefined;
  getName(): string;
}
export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      getName() {
        const user = get();
        return user.firstName + ' ' + user.lastName;
      },
      setUser(user) {
        set((state) => ({ ...state, ...user }));
      },
      syncMemberToUser(member) {
        const user = get();
        const diff: Partial<Member> = {
          name: member.name == user.getName() ? undefined : user.getName(),
          age: member.age == user.age ? undefined : user.age,
          gender: member.gender == user.gender ? undefined : user.gender,
          phone: member.phone == user.phone ? undefined : user.phone,
          address: member.address == user.address ? undefined : user.address,
        };
        //filter undefined
        Object.keys(diff).forEach(
          (key) =>
            diff[key as keyof Member] === undefined &&
            delete diff[key as keyof Member],
        );
        if (Object.keys(diff).length > 0) {
          return diff;
        } else return undefined;
      },
    }),
    {
      name: 'UserDataStore',
    },
  ),
);
