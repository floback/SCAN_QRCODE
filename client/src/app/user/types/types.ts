export enum UserType {
  admin = "admin",
  user = "user",
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  type_user: UserType;
  status?: boolean;
  avatar?: string;
}
