import create from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  refreshToken?: string;
  accessToken?: string;
  setTokens(props: { accessToken: string; refreshToken: string }): void;
  discard(): void;
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      setTokens: (props) => set((state) => ({ ...state, ...props })),
      discard: () =>
        set(() => ({ accessToken: undefined, refreshToken: undefined })),
    }),
    {
      name: 'AuthStore',
    },
  ),
);
