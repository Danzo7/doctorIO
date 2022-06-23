interface Member {
  name: string;
  memberId: number;
  userId: number; //"machineId"
  accessKey: string;
  roles: Role[];
}
interface Role {
  roleId: number;
  roleName: string;
  roleDesc: string;
}
interface Permission {}
interface Clinic {
  clinicId: number;
  description: string;
  clinicName: string;
  serviceStatus: string;
  memberCount: number;
  clinicAddress: string;
  connectionCount: number;
  patientCount: number;
}

export type { Clinic, Member, Permission, Role };
