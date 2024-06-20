import {User} from "./user";

export interface Auth {
  user: User;
  tokenType: string,
  accessToken: string,
  expiration: any,
}
