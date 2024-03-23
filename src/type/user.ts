type UserType = "ADMIN" | "CUSTOMER";

export interface User {
  name: string;
  email: string;
  contactNumber: string;
  contactNumberExtension: string;
  password: string;
  role: UserType;
}
