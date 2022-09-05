import { PermKeys } from '@models/server.models';
import { Actions, Subjects } from './ability.factory';

export function canDo(action: Actions, subject: Subjects, perms: PermKeys[]) {
  return perms.includes(
    ['CAN', action, subject].join('_').toUpperCase() as PermKeys,
  );
}
export function parsePerms(perms: PermKeys[]) {
  return perms.map((n) => {
    const splitter = n.split('_');
    if (splitter.length < 3) throw new Error('Invalid permission');
    const [_, action, ...subject] = splitter;
    return {
      action: action as Actions,
      subject: subject.join('_') as Subjects,
    };
  });
}
