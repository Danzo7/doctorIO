interface Member {
  id: number;
  name: string;
  age: number;
  gender: 'female' | 'male';
  userId: string;
  roles: RoleBrief[];
  addedBy?: { id: number; name: string };
  status: boolean;
  joinDate: Date;
  avatar?: string;
  address?: string;
  phone?: string;
  publicKey?: string;
  isOwner?: boolean;
  queues?: MemberQueue[];
}
export type MemberQueue = {
  id: number;
  roleId: number;
  name: string;
  owner: boolean;
};
type RoleBrief = Pick<
  Role,
  'name' | 'id' | 'priority' | 'description' | 'masterRole'
>;
type MemberBrief = Pick<
  Member,
  'id' | 'name' | 'status' | 'roles' | 'joinDate' | 'avatar'
>;
type Role = {
  id: number;
  name: string;
  priority: number;
  description?: string;
  permissions: PermKeys[];
  masterRole?: RoleBrief;
  slaveRole?: RoleBrief;
};

export const permList = [
  'CAN_HAVE_ADMIN', //0
  'CAN_ADD_MEMBERS', //1
  'CAN_MANAGE_ROLE', //2
  'CAN_VIEW_PATIENTSLIST', //3
  'CAN_ADD_PATIENT', //4
  'CAN_MANAGE_PATIENT', //5
  'CAN_HAVE_QUEUE', //6
  'CAN_ADD_DRUGS', //7
  'CAN_VIEW_CLINIC_INSIGHT', //8
  'CAN_MANAGE_DATA_COLLECTION', //9
  'CAN_VIEW_RECORDS', //10
  'CAN_MANAGE_MEMBERS', //11
  'CAN_REMOVE_MEMBERS', //12
  'CAN_MANAGE_CLINIC', //13
  'CAN_HAVE_MESSAGES', //14
  'CAN_MANAGE_QUEUE', //15
] as const;
type PermKeys = typeof permList[number];
type RolePermissions = Partial<Record<PermKeys, true>>;
interface Permission<T> {
  name: string;
  description?: string;
  permKey: T;
}

interface Clinic {
  description?: string;
  name: string;
  serviceStatus: string;
  memberCount: number;
  address: string;
  connectionCount: number;
  patientCount: number;
  phone?: string;
  avatar: string;
  timing: ClinicTiming;
  preferences: PrefKeys[];
}
type DayAliased = 0 | 1 | 2 | 3 | 4 | 5 | 6;
type ClinicTiming = {
  timeToOpen: string;
  timeToClose: string;
  breakStart: string;
  breakEnd: string;
  workingDays: DayAliased[];
  rules: Rulekeys[];
};

type Rulekeys = 'canPauseQueue' | 'canTakeBreak' | 'canBypassClosing';
type PrefKeys = 'CAN_CREATE_SESSION' | 'CAN_USE_MESSAGE_EXT';

export type {
  Clinic,
  Member,
  Permission,
  Role,
  RolePermissions,
  PermKeys,
  Rulekeys,
  PrefKeys,
  ClinicTiming,
  RoleBrief,
  MemberBrief,
};
