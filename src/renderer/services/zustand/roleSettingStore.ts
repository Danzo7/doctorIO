import { PermKeys } from '@models/server.models';
import create from 'zustand';

interface RoleSettingState {
  isDirty: boolean;
  name?: string;
  description?: string;
  permissions: PermKeys[];
  defaults?: Pick<RoleSettingState, 'name' | 'description' | 'permissions'>;
  setDefaults: (
    defaults: Pick<RoleSettingState, 'name' | 'description' | 'permissions'>,
  ) => void;
  setSettings: (props: {
    isDirty?: boolean;
    name?: string;
    description?: string;
    permissions?: PermKeys[];
    defaults?: Pick<RoleSettingState, 'name' | 'description' | 'permissions'>;
  }) => void;
}

export const useRoleSettingStore = create<RoleSettingState>((set) => ({
  isDirty: false,
  permissions: [],
  setSettings: ({ name, description, permissions, defaults, isDirty }) =>
    set((state) => {
      const newState = {
        name: name ?? state.name,
        description: description ?? state.description,
        permissions: permissions ?? state.permissions,
        defaults: defaults ?? state.defaults, // this is the only line that is different
      };
      return {
        ...newState,
        isDirty:
          isDirty != undefined
            ? isDirty
            : !(
                newState?.name === newState.defaults?.name &&
                newState?.description === newState.defaults?.description &&
                newState?.permissions?.length ===
                  newState.defaults?.permissions.length &&
                newState?.permissions?.every((p) =>
                  newState.defaults?.permissions.includes(p),
                )
              ),
      };
    }),
  setDefaults: (defaults) => set((state) => ({ ...state, defaults })),
}));
export const useRoleSettings = () => useRoleSettingStore((state) => state);
export const useSetSettings = () =>
  useRoleSettingStore((state) => state.setSettings);
export const useSetDefaults = () =>
  useRoleSettingStore((state) => state.setDefaults);
export const useGetDefaults = () =>
  useRoleSettingStore((state) => state.defaults);
export const useIsDirty = () => useRoleSettingStore((state) => state.isDirty);
export const useGetPermissionsSettings = () =>
  useRoleSettingStore((state) => state.permissions);
export const useGetRoleGeneralSettings = () =>
  useRoleSettingStore(({ description, name }) => ({ description, name }));
