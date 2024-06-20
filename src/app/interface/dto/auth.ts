import {User} from "./user";

export interface Auth {
  accessToken: string,
  tokenType: string,
  user: User;
}
