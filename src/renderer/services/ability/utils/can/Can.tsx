import { useAbilityStore } from '@stores/abilityStore';
import { ReactNode } from 'react';
import { Action, Subjects } from '../ability.factory';
interface CanProps {
  I: Action;
  a: Subjects;
  children: ReactNode;
}
export default function Can({ I, a, children }: CanProps) {
  const abilities = useAbilityStore((state) => state.ability);

  return abilities.can(I, a) ? <>{children}</> : null;
}
