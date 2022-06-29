import {
  Permission,
  PermKeys,
  PrefKeys,
  Rulekeys,
} from '@models/server.models';

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
    description: 'allow member to take custom breaks time during the work ',
  },
  {
    permKey: 'canPauseQueue',
    name: 'Allow queue pausing',
    description: 'allow member to pause the queue ',
  },
  {
    permKey: 'canBypassClosing',
    name: 'Allow bypass closing time',
    description:
      'allow member to continue working after the closing time of the clinic',
  },
];
export const preferences: Permission<PrefKeys>[] = [
  {
    permKey: 'canCreateSession',
    name: 'Enable earning & growth',
    description:
      'by enabling this members that can create session or members linked to them will be able to determine a price for their services',
  },
  {
    permKey: 'canMessageExternals',
    name: 'Allow outside messaging',
    description: 'Allow members to connect with externals over the internet',
  },
];
