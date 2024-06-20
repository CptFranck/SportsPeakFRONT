import {Role} from "./role";

export interface User {
  id: number,
  email: String,
  firstName: String,
  lastName: String,
  username: String,
  roles: [Role];
}
