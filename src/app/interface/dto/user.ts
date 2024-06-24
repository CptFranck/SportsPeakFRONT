import {Role} from "./role";

export interface User {
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  username: string,
  roles: Role[];
}
