export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "CUSTOMER" | "ORGANIZER";
  referralCode?: String;
  createdAt: string;
  updatedAt: string;
}
