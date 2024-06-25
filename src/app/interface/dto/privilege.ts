import {Role} from "./role";

export interface Privilege {
  id: string,
  name: string,
  roles: Role[],
}
