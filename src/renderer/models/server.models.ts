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
interface Permission {
  name: string;
  description: string;
  permKey: PermKeys;
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
  timeToClose: Date;
  avatar: string;
}

export type { Clinic, Member, Permission, Role, RolePermissions };
