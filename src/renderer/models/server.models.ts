interface Member {
  id: number;
  name: string;
  age: number;
  gender: 'female' | 'male';
  userId: string;
  secretKey: string;
  roles: RoleBrief[];
  addedBy?: { id: number; name: string };
  status: boolean;
  joinDate: Date;
  avatar?: string;
  address?: string;
  phone?: string;
  publicKey?: string;
  isOwner?: boolean;
  refreshToken?: string; //backendOnly
}
type RoleBrief = Pick<Role, 'name' | 'id' | 'priority' | 'description'>;
type MemberBrief = Pick<
  Member,
  'id' | 'name' | 'status' | 'roles' | 'joinDate' | 'avatar'
>;
type Role = {
  id: number;
  name: string;
  priority: number;
  description?: string;
  permissions?: PermKeys[];
  masterRole?: RoleBrief;
  slaveRole?: RoleBrief;
};
type RoleBrief = {
  id: number;
  name: string;
  priority: number;
};
type PermKeys =
  | 'CAN_HAVE_ADMIN'
  | 'CAN_ADD_MEMBERS'
  | 'CAN_MANAGE_ROLE'
  | 'CAN_VIEW_PATIENTSLIST'
  | 'CAN_ADD_PATIENT'
  | 'CAN_MANAGE_PATIENT'
  | 'CAN_HAVE_QUEUE'
  | 'CAN_MANAGE_QUEUE'
  | 'CAN_ADD_DRUGS'
  | 'CAN_VIEW_CLINIC_INSIGHT'
  | 'CAN_MANAGE_DATA_COLLECTION'
  | 'CAN_VIEW_RECORDS'
  | 'CAN_MANAGE_MEMBERS'
  | 'CAN_REMOVE_MEMBERS'
  | 'CAN_MANAGE_CLINIC'
  | 'CAN_HAVE_MESSAGES';
export const permList: PermKeys[] = [
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
];
type RolePermissions = Partial<Record<PermKeys, true>>;
interface Permission<T> {
  name: string;
  description?: string;
  permKey: T;
}
interface Clinic {
  clinicId: number;
  description?: string;
  clinicName: string;
  serviceStatus: string;
  memberCount: number;
  clinicAddress: string;
  connectionCount: number;
  patientCount: number;
  phoneNumber?: string;
  avatar: string;
  timing: ClinicTiming;
  preferences: ClinicPreferences;
}
type ClinicPreferences = Partial<Record<PrefKeys, true>>;
type ClinicTiming = {
  timeToOpen: string;
  timeToClose: string;
  breakStart: string;
  breakEnd: string;
  workingDays: DayAliased[];
} & Rules;
type Rules = Partial<Record<Rulekeys, true>>;

type Rulekeys = 'canPauseQueue' | 'canTakeBreak' | 'canBypassClosing';
type PrefKeys = 'canCreateSession' | 'canMessageExternals';

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
