export enum IGender {
  male,
  female,
  other,
}
export enum SocialPlatform {
  GITHUB,
  TWITTER,
  LINKEDIN,
  YOUTUBE,
  WEBSITE,
  OTHER,
}
interface ISkill {
  name: string;
  percentage: number;
  slug: String;
  category: any;
}
interface ISkillsCategory {
  name?: string;
  value: number;
  skills: ISkill[];
}
interface ISocials {
  type: SocialPlatform;
  url: String;
}
export interface IProfile {
  yearsOfExp?: number;
  skills?: ISkillsCategory;
  bio?: string;
  age?: number;
  portfolio?: string;
  project: any;
  socials?: any;
}
export interface IUser {
  id: string;
  username: string;
  email: string;
  photoUrl: string;
  coverImage?: string;
  profile?: IProfile;
  followers: any;
  following: any;
  createdAt: any;
  updatedAt: any;
}
export interface InputProps {
  name: string;
  label?: string;
  type: string;
  value: string | undefined;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onfocus?: () => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  showPasswordToggle?: boolean;
  defaultValue?: string;
  min?: string;
  max?: string;
  step?: string;
  clasName?: string;
  website?: string;
}
