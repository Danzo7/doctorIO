import { AppAbility } from '@ability/utils';
import { AppAbilityC } from '@ability/utils/ability.factory';
import create from 'zustand';

interface AbilityState {
  ability: AppAbility;
  set: (ability: AppAbility) => void;
}

export const useAbilityStore = create<AbilityState>((set) => ({
  ability: new AppAbilityC(),
  set: (ability) => set(() => ({ ability: ability })),
}));
export const useAbility = () => useAbilityStore((state) => state.ability);
