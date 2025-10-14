export interface IUser{
  id:string;
  user_name:string;
  email:string;
  googleId?: string;
  provider: "local" | "google";
}