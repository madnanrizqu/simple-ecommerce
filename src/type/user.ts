type UserType = "ADMIN" | "CUSTOMER";

export interface User {
  name: string;
  email: string;
  contactNumber: string;
  contactNumberExtension: string;
  password: string;
  role: UserType;
}

export interface UserAsResponse {
  id: number;
  name: string;
  email: string;
  contact_number: string;
  contact_number_extension: string;
  role: UserType;
  deleted: boolean;
}

export interface LoggedInUser {
  id: number;
  name: string;
  email: string;
  contact_number: string;
  contact_number_extension: string;
  role: UserType;
}
