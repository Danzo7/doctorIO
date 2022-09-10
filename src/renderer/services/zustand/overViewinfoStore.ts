import { clinic } from '@api/fake';
import { ClinicTiming, PrefKeys } from '@models/server.models';
import create from 'zustand';

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
  formDefaults?: Pick<
    OverViewInfoState,
    'name' | 'description' | 'address' | 'phone'
  >;
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
    setOverViewInfo: ({ name, description, address, phone, formDefaults }) =>
      set((state) => {
        const newState = {
          name: name ?? state.name,
          description: description ?? state.description,
          address: address ?? state.address,
          phone: phone ?? state.phone,
          formDefaults: formDefaults ?? state.formDefaults,
        };
        return {
          ...newState,
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
export const useSetDefaults = () =>
  useOverViewInfoStore((state) => state.setFormDefaults);
export const useGetDefaults = () =>
  useOverViewInfoStore((state) => state.formDefaults);
