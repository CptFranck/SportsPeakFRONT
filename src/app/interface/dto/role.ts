import {Privilege} from "./privilege";

export interface Role {
  id: string,
  name: string,
  privileges: Privilege[],
}
