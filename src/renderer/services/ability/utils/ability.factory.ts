import { Ability, AbilityBuilder, AbilityClass } from '@casl/ability';
import { PermKeys } from '@models/server.models';

import { parsePerms } from './parse.utils';

export enum Actions {
  add = 'add',
  manage = 'manage',
  view = 'view',
  remove = 'remove',
  have = 'have',
}
export type Action = 'add' | 'manage' | 'view' | 'remove' | 'have';

export type Subjects =
  | 'admin'
  | 'role'
  | 'patientslist'
  | 'patient'
  | 'queue'
  | 'drugs'
  | 'clinic'
  | 'data'
  | 'records'
  | 'members'
  | 'messages';
export enum SubjectsEnum {
  admin = 'admin',
  role = 'role',
  patientslist = 'patientslist',
  patient = 'patient',
  queue = 'queue',
  drugs = 'drugs',
  clinic = 'clinic',
  data = 'data',
  records = 'records',
  members = 'members',
  messages = 'messages',
}
export type AppAbility = Ability<[Actions | Action, Subjects]>;
export const AppAbilityC = Ability as AbilityClass<AppAbility>;

function canAll(can: any) {
  Object.values(SubjectsEnum).forEach((subject) => {
    can(Actions.manage, subject);
    can(Actions.have, subject);
    can(Actions.view, subject);
    can(Actions.add, subject);
    can(Actions.remove, subject);
  });
}

export function defineRulesFor(perms: PermKeys[], isOwner?: boolean) {
  const { can, rules } = new AbilityBuilder(
    Ability as AbilityClass<AppAbility>,
  );
  if (isOwner) {
    canAll(can);
  } else {
    parsePerms(perms).forEach(({ action, subject }) => {
      if (isOwner || (action === Actions.have && subject === 'admin')) {
        canAll(can);
      } else {
        if (action === 'manage') {
          can(Actions.add, subject);
          can(Actions.remove, subject);
          can(Actions.view, subject);
        }
        can(action, subject);
      }
    });
  }
  return rules;
}
export function buildAbilityFor(
  perms: PermKeys[],
  isOwner?: boolean,
): AppAbility {
  return new AppAbilityC(defineRulesFor(perms, isOwner), {
    detectSubjectType: (subject) => {
      return subject as any as Subjects;
    },
  });
}
