import {Privilege} from "./privilege";
import {User} from "./user";

export interface Role {
  id: string,
  name: string,
  privileges: Privilege[],
  users: User[],
}
