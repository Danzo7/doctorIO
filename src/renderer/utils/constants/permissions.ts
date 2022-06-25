import { Permission } from '@models/server.models';

export const PERMISSIONS: Permission[] = [
  {
    permKey: 'isAdmin',
    name: 'Administrator',
    description: 'Can manage all aspects of the application',
  },
  {
    permKey: 'canAddMember',
    name: 'Add Member',
    description: 'Can add new members to the application',
  },
];
