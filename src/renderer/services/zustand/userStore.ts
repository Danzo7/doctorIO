import { AppUser } from '@models/local.models';
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState extends AppUser {
  setUser(props: Partial<AppUser>): void;
}
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      setUser(user) {
        set((state) => ({ ...state, ...user }));
      },
    }),
    {
      name: 'UserDataStore',
    },
  ),
);
