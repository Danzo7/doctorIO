import {
  Permission,
  PermKeys,
  PrefKeys,
  Rulekeys,
} from '@models/server.models';

export const PERMISSIONS: Permission<PermKeys>[] = [
  {
    permKey: 'CAN_HAVE_ADMIN',
    name: 'Administrator',
    description: 'Can manage all aspects of the application',
  },

  {
    permKey: 'CAN_ADD_MEMBERS',
    name: 'Add Member',
    description: 'Can add new members to the clinic',
  },
  {
    permKey: 'CAN_MANAGE_ROLE',
    name: 'Manage Roles',
    description: 'Can manage clinic roles',
  },
  {
    permKey: 'CAN_VIEW_PATIENTSLIST',
    name: 'Access patients list',
    description: 'Can access patients list',
  },
  {
    permKey: 'CAN_ADD_PATIENT',
    name: 'Add patients',
    description: 'Can add patients ',
  },
  {
    permKey: 'CAN_MANAGE_PATIENT',
    name: 'Manage patients',
    description: 'Can manage patients ',
  },
  {
    permKey: 'CAN_HAVE_QUEUE',
    name: 'Have a Queue',
    description: 'Can Have a Queue list ',
  },
  {
    permKey: 'CAN_ADD_DRUGS',
    name: 'Add drugs',
    description: 'can Add a drug to the drugs list ',
  },
  // {
  //   permKey: 'CAN_VIEW_CLINIC_INSIGHT',
  //   name: 'View clinic insight',
  //   description: 'can view clinic insight and analyses',
  // },
  // {
  //   permKey: 'CAN_MANAGE_DATA_COLLECTION',
  //   name: 'Manage Data Collections',
  //   description: 'can Manage Data Collections',
  // },
  {
    permKey: 'CAN_VIEW_RECORDS',
    name: 'View medical records',
    description: 'can view medical records of patients',
  },
  {
    permKey: 'CAN_MANAGE_MEMBERS',
    name: 'Manage members',
    description: 'can manage all the members of the clinic',
  },
  {
    permKey: 'CAN_REMOVE_MEMBERS',
    name: 'Remove member',
    description: 'can remove a selected member from the clinic ',
  },
  {
    permKey: 'CAN_MANAGE_CLINIC',
    name: 'Manage clinic',
    description: 'can manage the setting of the clinic',
  },
  {
    permKey: 'CAN_HAVE_MESSAGES',
    name: 'Use messages',
    description: 'allow member to send and receive messages ',
  },
  {
    permKey: 'CAN_MANAGE_QUEUE',
    name: 'Manage queue',
    description: 'allow member to manage queue ', //TODO update description
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
    permKey: 'CAN_CREATE_SESSION',
    name: 'Enable earning & growth',
    description:
      'by enabling this members that can create session or members linked to them will be able to determine a price for their services',
  },
  {
    permKey: 'CAN_USE_MESSAGE_EXT',
    name: 'Allow outside messaging',
    description: 'Allow members to connect with externals over the internet',
  },
];
