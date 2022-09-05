import { AppAbility } from '@ability/utils';
import create from 'zustand';

interface AbilityState {
  ability: AppAbility;
  set: (ability: AppAbility) => void;
}

export const useAbilityStore = create<AbilityState>((set) => ({
  ability: {} as AppAbility,
  set: (ability) => set(() => ({ ability: ability })),
}));
export const useAbility = () => useAbilityStore((state) => state.ability);
