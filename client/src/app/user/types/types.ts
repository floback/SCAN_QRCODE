export enum UserType {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  type_user: UserType;
  status: boolean;
}
