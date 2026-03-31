export enum IGender {
  male,
  female,
  other,
}
export interface IUser {
  username?: string;
  email?: string;
  bio?: string;
  age: number;
  gender: IGender;
  githubUrl: string;
  twitterUrl: string;
  linkedInUrl: string;
  photoUrl: string;
  location: string;
  createdAt: any;
}
