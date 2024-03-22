export type User = {
  userId: string;
  email: string;
  roleId: string;
  profileId: string;
  permissions: string[];
};

export type Profile = {
  profileId: string;
  firstName: string;
  lastName: string;
  profile_pic: string;
  address?: string;
  phone?: string;
  userId: string;
};
