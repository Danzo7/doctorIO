interface Member {
  name: string;
  memberId: string;
  userId: string;
  token: string;
  roles: Role[];
}
interface Role {
  roleID: string;
  roleName: string;
  roleDesc: string;
}
interface Permission {}
interface Clinic {
  clinicId: string;
  description: string;
  serverLocation: string;
  members: Member[];
}

export type { Clinic, Member, Permission, Role };
