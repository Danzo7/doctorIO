interface Member {
  name: string;
  memberId: number;
  age: number;
  gender: 'Female' | 'Men';
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
interface RolePermissions {
  isAdmin: boolean;
  canAddMember: boolean;
  canManageRole: boolean;
  canAddPatients: boolean;
  canHaveQueue: boolean;
  canAddDrugs: boolean;
  canViewClinicInsight: boolean;
  canManageDataCollection: boolean;
  canViewMedicalRecords: boolean;
  canManageMembers: boolean;
  canManageClinic: boolean;
  canUseMessages: boolean;
}
interface Permission {
  permissionName: string;
  permissionDesc: string;
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
