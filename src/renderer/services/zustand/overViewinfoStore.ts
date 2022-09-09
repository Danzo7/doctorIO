import { clinic } from '@api/fake';
import { useGetClinicQuery } from '@redux/clinic/clinicApi';
import create from 'zustand';

interface OverViewInfoState {
  name?: string;
  description?: string;
  address?: string;
  phone?: string;
  defaults?: Pick<
    OverViewInfoState,
    'name' | 'description' | 'address' | 'phone'
  >;
  setDefaults: (
    defaults: Pick<
      OverViewInfoState,
      'name' | 'description' | 'address' | 'phone'
    >,
  ) => void;
  setOverViewInfo: (props: {
    name?: string;
    description?: string;
    address?: string;
    phone?: string;
    defaults?: Pick<
      OverViewInfoState,
      'name' | 'description' | 'address' | 'phone'
    >;
  }) => void;
}

export const useOverViewInfoStore = create<OverViewInfoState>((set) => {
  //   const { data, error, isSuccess } = useGetClinicQuery();
  return {
    // defaults: {
    //   name: isSuccess ? data.name : '',
    //   description: isSuccess ? data.description : '',
    //   address: isSuccess ? data.address : '',
    //   phone: isSuccess ? data.phone : '',
    // },
    setOverViewInfo: ({ name, description, address, phone, defaults }) =>
      set((state) => {
        const newState = {
          name: name ?? state.name,
          description: description ?? state.description,
          address: address ?? state.address,
          phone: phone ?? state.phone,
          defaults: defaults ?? state.defaults,
        };
        return {
          ...newState,
        };
      }),
    setDefaults: (defaults) => set((state) => ({ ...state, defaults })),
  };
});
export const useOverViewInfo = () => useOverViewInfoStore((state) => state);
export const useSetOverViewInfo = () =>
  useOverViewInfoStore((state) => state.setOverViewInfo);
export const useSetDefaults = () =>
  useOverViewInfoStore((state) => state.setDefaults);
export const useGetDefaults = () =>
  useOverViewInfoStore((state) => state.defaults);
