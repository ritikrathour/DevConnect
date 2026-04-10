export enum IGender {
  male,
  female,
  other,
}
export interface IUser {
  id: string;
  username: string;
  email: string;
  yearsOfExp?: number;
  skills?: any;
  age?: number;
  project: any;
  socials: any;
  followers: any;
  following: any;
  createdAt: any;
  updatedAt: any;
}
