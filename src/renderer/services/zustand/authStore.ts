import create from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  refreshToken?: string;
  accessToken?: string;
  set(props: Partial<AuthState>): void;
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      set: (props) => set((state) => ({ ...state, ...props })),
    }),
    {
      name: 'AuthStore',
    },
  ),
);
