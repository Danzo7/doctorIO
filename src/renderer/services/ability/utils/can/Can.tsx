import { useAbility } from '@stores/abilityStore';
import { ReactNode } from 'react';
import { Action, Subjects } from '../ability.factory';
interface CanProps {
  I: Action;
  a: Subjects;
  or?: Action[];
  children: ((isAllowed: boolean) => ReactNode) | ReactNode;
}
export default function Can({ I, a, children, or }: CanProps) {
  const abilities = useAbility();
  //check if any element in the array is allowed
  const isAllowed =
    abilities.can(I, a) || (or ? or.some((o) => abilities.can(o, a)) : false);
  if (typeof children == 'function') return <>{children(isAllowed)}</>;
  return isAllowed ? <>{children}</> : null;
}
