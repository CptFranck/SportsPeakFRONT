import {User} from "./user";

export interface Auth {
  user: User;
  tokenType: string,
  token: string,
}
