import { Permission, PermKeys, Rulekeys } from '@models/server.models';

export const PERMISSIONS: Permission<PermKeys>[] = [
  {
    permKey: 'isAdmin',
    name: 'Administrator',
    description: 'Can manage all aspects of the application',
  },

  {
    permKey: 'canAddMember',
    name: 'Add Member',
    description: 'Can add new members to the clinic',
  },
  {
    permKey: 'canManageRole',
    name: 'Manage Roles',
    description: 'Can manage clinic roles',
  },
  {
    permKey: 'canAccessPatientsList',
    name: 'Access patients list',
    description: 'Can access patients list',
  },
  {
    permKey: 'canAddPatients',
    name: 'Add patients',
    description: 'Can add patients ',
  },
  {
    permKey: 'canManagePatients',
    name: 'Manage patients',
    description: 'Can manage patients ',
  },
  {
    permKey: 'canHaveQueue',
    name: 'Have a Queue',
    description: 'Can Have a Queue list ',
  },
  {
    permKey: 'canAddDrugs',
    name: 'Add drugs',
    description: 'can Add a drug to the drugs list ',
  },
  {
    permKey: 'canViewClinicInsight',
    name: 'View clinic insight',
    description: 'can view clinic insight and analyses',
  },
  {
    permKey: 'canManageDataCollection',
    name: 'Manage Data Collections',
    description: 'can Manage Data Collections',
  },
  {
    permKey: 'canViewMedicalRecords',
    name: 'View medical records',
    description: 'can view medical records of patients',
  },
  {
    permKey: 'canManageMembers',
    name: 'Manage members',
    description: 'can manage all the members of the clinic',
  },
  {
    permKey: 'canRemoveMember',
    name: 'Remove member',
    description: 'can remove a selected member from the clinic ',
  },
  {
    permKey: 'canManageClinic',
    name: 'Manage clinic',
    description: 'can manage the setting of the clinic',
  },
  {
    permKey: 'canUseMessages',
    name: 'Use messages',
    description: 'allow member to send and receive messages ',
  },
];
export const rules: Permission<Rulekeys>[] = [
  {
    permKey: 'canTakeBreak',
    name: 'Allow custom breaks',
    description: 'This is an example permission',
  },
];
