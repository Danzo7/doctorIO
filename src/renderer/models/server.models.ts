interface Member {
  name: string;
  memberId: number;
  age: number;
  gender: 'Female' | 'male';
  userId: number; //"machineId"
  accessKey?: string;
  roles: Role[];
  addedBy: string;
  memberStatus: boolean;
  joinDate: Date;
  avatar?: string;
  address?: string;
  phoneNumber?: string;
}
type Role = {
  roleId: number;
  roleName: string;
  roleDesc?: string;
  rolePermissions?: RolePermissions;
  linkedRole?: { roleName: string; roleId: number };
  members?: Member[];
};

type PermKeys =
  | 'isAdmin'
  | 'canAddMember'
  | 'canManageRole'
  | 'canAccessPatientsList'
  | 'canAddPatients'
  | 'canManagePatients'
  | 'canHaveQueue'
  | 'canAddDrugs'
  | 'canViewClinicInsight'
  | 'canManageDataCollection'
  | 'canViewMedicalRecords'
  | 'canManageMembers'
  | 'canRemoveMember'
  | 'canManageClinic'
  | 'canUseMessages';

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
};
