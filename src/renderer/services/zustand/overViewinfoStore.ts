import { clinic } from '@api/fake';
import { ClinicTiming, PrefKeys } from '@models/server.models';
import create from 'zustand';
//TODO : remove this store and use rtk cache
interface OverViewInfoState {
  name?: string;
  description?: string;
  address?: string;
  phone?: string;
  serviceStatus: string;
  memberCount: number;
  connectionCount: number;
  patientCount: number;
  avatar: string;
  timing: ClinicTiming;
  preferences: PrefKeys[];

  setFormDefaults: (
    formDefaults: Pick<
      OverViewInfoState,
      'name' | 'description' | 'address' | 'phone'
    >,
  ) => void;
  setOverViewInfo: (props: {
    name?: string;
    description?: string;
    address?: string;
    phone?: string;
    formDefaults?: Pick<
      OverViewInfoState,
      'name' | 'description' | 'address' | 'phone'
    >;
  }) => void;
}

export const useOverViewInfoStore = create<OverViewInfoState>((set) => {
  return {
    setOverViewInfo: ({ name, description, address, phone }) =>
      set((state) => {
        return {
          ...state,
          name,
          description,
          address,
          phone,
        };
      }),
    setFormDefaults: (formDefaults) =>
      set((state) => ({ ...state, formDefaults })),
    memberCount: clinic.memberCount,
    connectionCount: clinic.connectionCount,
    patientCount: clinic.patientCount,
    avatar: clinic.avatar,
    timing: clinic.timing,
    preferences: clinic.preferences,
    serviceStatus: clinic.serviceStatus,
  };
});
export const useOverViewInfo = () => useOverViewInfoStore((state) => state);
export const useSetOverViewInfo = () =>
  useOverViewInfoStore((state) => state.setOverViewInfo);
