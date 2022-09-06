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
  if (typeof children == 'function')
    return (
      <>{children(abilities.can(I, a) && (or ? or.every(Boolean) : true))}</>
    );
  return abilities.can(I, a) && (or ? or.every(Boolean) : true) ? (
    <>{children}</>
  ) : null;
}
