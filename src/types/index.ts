export type User = {
  id: string;
  email: string;
  roleId: string;
  profile: {
    id: string;
    firstName: string;
    lastName: string;
    phone?: string;
    userId: string;
  };
  permissions: string[];
};
